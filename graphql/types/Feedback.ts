import { list, mutationField, nonNull, objectType, queryField } from "nexus";
import { Category } from "./Category";

export const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.nonNull.int("id"),
      t.string("title"),
      t.string("description"),
      t.int("category_id"),
      t.boolean("archived"),
      t.field("create_date", {
        type: "DateTime",
      }),
      t.field("archive_date", {
        type: "DateTime",
      }),
      t.field("category", {
        type: Category,
        async resolve(src, _args, ctx) {
          if (src.category_id) {
            return await ctx.prisma.category.findUnique({
              where: {
                id: src.category_id,
              },
            });
          }
          return null;
        },
      });
  },
});

export const PaginatedArchive = objectType({
  name: "PaginatedArchive",
  definition(t) {
    t.list.field("feedbacks", {
      type: Feedback,
    }),
      t.boolean("hasMore"),
      t.int("nextCursor");
  },
});

export const CreateFeedbackMutation = mutationField("createFeedback", {
  type: Feedback,
  description: "Create feedback",
  args: {
    title: nonNull("String"),
    description: nonNull("String"),
    category_id: nonNull("Int"),
  },
  async resolve(_src, args, ctx) {
    const newFeedback = await ctx.prisma.feedback.create({
      data: {
        title: args.title,
        description: args.description,
        category_id: args.category_id,
      },
    });
    return newFeedback;
  },
});

export const ActiveFeedbacksQuery = queryField("feedbacks", {
  type: list(Feedback),
  description:
    "Returns a list of feedbacks that are not archived and are filtered if search parameters are provided",
  args: {
    categoryId: "Int",
    text: "String",
  },
  async resolve(_src, args, ctx) {
    const result = await ctx.prisma.feedback.findMany({
      where: {
        archived: false,
        AND: {
          category_id: args.categoryId != null ? args.categoryId : undefined,
          OR: {
            title: {
              contains: args.text != null ? args.text : undefined,
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return result;
  },
});

export const ArchiveFeedbackMutation = mutationField("archiveFeedback", {
  type: "Boolean",
  description: "Set feedback as archived",
  args: {
    id: nonNull("Int"),
  },
  async resolve(_src, args, ctx) {
    const result = await ctx.prisma.feedback.update({
      data: {
        archived: true,
        archive_date: new Date(),
      },
      where: {
        id: args.id,
      },
    });
    if (result) {
      return true;
    }
    return false;
  },
});

export const ArchivedQuery = queryField("archivedFeedbacks", {
  type: PaginatedArchive,
  description: "Gets a list of 5 feedbacks that are archived",
  args: {
    cursor: "Int",
  },
  async resolve(_src, args, ctx) {
    let result;
    if (args.cursor) {
      result = await ctx.prisma.feedback.findMany({
        take: 6,
        cursor: {
          id: args.cursor,
        },
        where: {
          archived: true,
        },
        orderBy: {
          archive_date: "desc",
        },
      });
    } else {
      result = await ctx.prisma.feedback.findMany({
        take: 6,
        where: {
          archived: true,
        },
        orderBy: {
          archive_date: "desc",
        },
      });
    }

    const hasMore = result.length === 6;

    return {
      feedbacks: result.slice(0, 5),
      hasMore: hasMore,
      nextCursor: hasMore ? result[5].id : null,
    };
  },
});

export const FeedbackQuery = queryField("feedback", {
  type: Feedback,
  args: {
    id: nonNull("Int"),
  },
  description: "Get single active feedback by id",
  async resolve(_src, args, ctx) {
    const result = await ctx.prisma.feedback.findFirst({
      where: {
        id: args.id,
        AND: {
          archived: false,
        },
      },
    });

    return result;
  },
});
