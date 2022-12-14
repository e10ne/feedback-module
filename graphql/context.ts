import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";

export type Context = {
  prisma: PrismaClient;
};

//  req, res
export async function createContext({}): Promise<Context> {
  return {
    prisma,
  };
}
