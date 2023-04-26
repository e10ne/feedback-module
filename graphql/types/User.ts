import { mutationField, nonNull, objectType, queryField } from "nexus";
import argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import cookie from "cookie";
import { Token } from "../../lib/types";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("username");
  },
});

export const Login = mutationField("login", {
  type: User,
  description: "Login",
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

    if (!user) return null;

    const valid = await argon2.verify(user.password, args.password);

    if (!valid) return null;

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: "12h" }
    );

    ctx.res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 12, // 12 hours
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      })
    );

    return user;
  },
});

export const Logout = mutationField("logout", {
  type: "Boolean",
  async resolve(_src, _args, ctx) {
    ctx.res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      })
    );

    return true;
  },
});

export const Me = queryField("me", {
  type: User,
  async resolve(_src, _args, ctx) {
    const userCookie = ctx.req.cookies["token"];

    if (!userCookie) return null;

    let decodedJwt;

    try {
      decodedJwt = jwt.verify(
        userCookie,
        process.env.JWT_TOKEN_SECRET as string
      ) as Token;
    } catch (err) {
      // cookie has been tampered with
      ctx.res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          expires: new Date(0),
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        })
      );
      return null;
    }

    if (!decodedJwt.userId) return null;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: decodedJwt.userId,
      },
    });

    return user;
  },
});
