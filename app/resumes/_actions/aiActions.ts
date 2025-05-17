"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateSummaryAction = async (input = "Hello!") => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
    // return redirect("/api/auth/register");
  }

  console.log("Action AI input:", input);

  const token = process.env.AI_KEY;

  if (!token) throw new Error("Can't get Token!(");

  const genAI = new GoogleGenerativeAI(token);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { baseUrl: "https://api.proxyapi.ru/google" });

  const prompt = input;
  const result = await model.generateContent([prompt]);

  console.log("Action AI result:", result);
  console.log("Action AI result candidates:", result.response.candidates);

  return !result.response.candidates ? "" : result.response.candidates[0];
};
