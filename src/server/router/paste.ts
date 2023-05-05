import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const pasteSelector = Prisma.validator<Prisma.PasteSelect>()({
  id: true,
  createdAt: false,
  content: false,
});

export const pasteRouter = createRouter()
  .query("getPaste", {
    input: z
      .object({
        id: z.string().nullish(),
      })
      .nullish(),
    resolve({ input, ctx }) {
      return ctx.prisma.paste.findUnique({
        where: {
          id: input?.id as string,
        },
        select: {
          content: false,
          id: false,
          urlID: true,
          createdAt: false,
        },
      });
    },
  })
  .query("getPasteContents", {
    input: z
      .object({
        urlID: z.string().nullish(),
      })
      .nullish(),
    resolve({ input, ctx }) {
      return ctx.prisma.paste.findUnique({
        where: {
          urlID: input?.urlID as string,
        },
        select: {
          content: true,
          id: false,
          urlID: false,
          createdAt: false,
        },
      });
    },
  })
  .mutation("createPaste", {
    input: z
      .object({
        text: z.string(),
        id: z.string().nullish(),
      })
      .nullish(),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.paste.create({
        data: {
          id: input?.id as string,
          urlID: shortenBase64(input?.id as string),
          content: input?.text as string,
        },
        select: pasteSelector,
      });
    },
  });

const shortenBase64 = (uuid: string): string => {
  const hex = uuid.replace(/-/g, "");
  const base64String = Buffer.from(hex, "hex").toString("base64");
  return base64String.replaceAll("/", "");
};
