import { generateCode } from "@/lib/generate-code";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { z } from "zod";

const createLinkSchema = z.object({
  url: z.string().url(),
});

export async function POST(request: Request) {
  const body = await request.json();

  const result = createLinkSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: "URL inválida" }, { status: 400 });
  }

  // Saves the valid url
  const { url } = result.data;

  const MAX_ATTEMPTS = 5;

  // Attemps for generate a not existent code
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = generateCode(6);

    try {
      const link = await prisma.link.create({
        data: {
          code: code,
          originalUrl: url,
        },
      });
      return Response.json({ code: link.code }, { status: 201 });
    } catch (error) {
      // If is a know error on prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 Unique constraint
        if (error.code === "P2002") {
          continue; // Retry
        }
      }
      // If is another error 
      return Response.json({ error: "Não foi possível gerar o link" }, { status: 500 });
    }
  }

  // If exhaust all attempts
  return Response.json(
    { error: "Não foi possível gerar um código único. Tente novamente." },
    { status: 500 }
  );
}