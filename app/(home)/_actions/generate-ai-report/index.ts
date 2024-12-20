"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { OpenAI } from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({month}: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === 'premium';
  if (!hasPremiumPlan) {
    throw new Error("User does not have a premium plan");
  }

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Você é um especialista em finanças e economia. Você ajuda as pessoas a organizarem melhor as suas finanças." },
      { role: "user", content },
    ],
  });

  return completion.choices[0].message.content;
};