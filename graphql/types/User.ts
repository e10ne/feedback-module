import { mutationField, nonNull, objectType } from "nexus";
import argon2 from "argon2";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("username");
  },
});

export const Login = mutationField("login", {
  type: User,
  args: {
    name: nonNull("String"),
    password: nonNull("String"),
  },
  async resolve(_src, args, ctx) {
    const user = await ctx.prisma.user.findFirst({
      where: {
        username: args.name,
      },
    });

    if (user) {
      const valid = await argon2.verify(user.password, args.password);
      if (valid) return user;
    }

    return null;
  },
});
