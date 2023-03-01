import { list, mutationField, nonNull, objectType, queryField } from "nexus";
import { Category } from "./Category";

export const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.nonNull.int("id"),
      t.string("title"),
      t.string("description"),
      t.nonNull.int("category_id"),
      t.boolean("archived"),
      t.field("create_date", {
        type: "DateTime",
      }),
      t.field("category", {
        type: Category,
        async resolve(src, _args, ctx) {
          return await ctx.prisma.category.findUnique({
            where: {
              id: src.category_id,
            },
          });
        },
      });
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

export const FeedbackQuery = queryField("feedback", {
  type: Feedback,
  description: "Get a specific feedback",
  args: {
    id: nonNull("Int"),
  },
  async resolve(_src, args, ctx) {
    const singleFeedback = await ctx.prisma.feedback.findUnique({
      where: {
        id: args.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        create_date: true,
        category_id: true,
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    return singleFeedback;
  },
});

export const ActiveFeedbacksQuery = queryField("feedbacks", {
  type: list(Feedback),
  description: "Returns feedbacks that are not archived",
  async resolve(_src, _args, ctx) {
    const feedbacks = await ctx.prisma.feedback.findMany({
      where: {
        archived: false,
      },
      orderBy: {
        id: "desc",
      },
    });

    return feedbacks;
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
