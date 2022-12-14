import {
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from "nexus";
import { Feedback } from "./Feedback";

export const Category = objectType({
  name: "Category",
  definition(t) {
    t.nonNull.int("id"),
      t.string("title"),
      t.list.field("feedbacks", {
        type: Feedback,
        async resolve(_src, _args, ctx) {
          return await ctx.prisma.feedback.findMany({
            where: {
              category_id: _src.id,
            },
          });
        },
      });
  },
});

export const CategoriesQuery = queryField("allCategories", {
  type: list(Category),
  description: "Gets all categories",
  async resolve(_src, _args, ctx) {
    const categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    return categories;
  },
});

export const CreateCategoryMutation = mutationField("createCategory", {
  type: Category,
  description: "Create a new category",
  args: {
    title: nonNull("String"),
  },
  async resolve(_src, args, ctx) {
    const newCategory = await ctx.prisma.category.create({
      data: {
        title: args.title,
      },
    });

    return newCategory;
  },
});

export const UpdateCategoryMutation = mutationField("updateCategory", {
  type: Category,
  description: "Change the category title",
  args: {
    id: nonNull("Int"),
    title: nonNull(stringArg()),
  },
  async resolve(_src, args, ctx) {
    const updatedCategory = await ctx.prisma.category.update({
      data: {
        title: args.title,
      },
      where: {
        id: args.id,
      },
    });

    return updatedCategory;
  },
});

export const DeleteCategoryMutation = mutationField("deleteCategory", {
  type: Category,
  description: "Delete an category",
  args: {
    id: nonNull("Int"),
  },
  async resolve(_src, args, ctx) {
    const deletedCategory = await ctx.prisma.category.delete({
      where: {
        id: args.id,
      },
    });
    return deletedCategory;
  },
});
