import { mutationField, nonNull, objectType } from "nexus";
import { Category } from "./Category";

export const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.nonNull.int("id"),
      t.string("title"),
      t.string("description"),
      t.nonNull.int("category_id"),
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
