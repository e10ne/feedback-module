import { objectType } from "nexus";
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
        async resolve(_src, _args, ctx) {
          return await ctx.prisma.category.findUnique({
            where: {
              id: _src.category_id,
            },
          });
        },
      });
  },
});
