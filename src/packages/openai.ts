import OpenAI from "openai";
import dotenv from "dotenv";
import { prompts } from "./prompts";
import { City } from "./weatherHelper";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const MODELS = {
    GPT35TURBO: 'gpt-3.5-turbo',
    GPT40MINI: 'gpt-4o-mini',
    GPT40: 'gpt-4o',
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });
export async function getCompletion(city: City) {
    
    return await openai.chat.completions.create({
        model: MODELS.GPT35TURBO,
        messages: [
            { role: "system", content: prompts.systemPrompt },
            { role: "user", content: prompts.hardcodedAgentPrompt(city) },
        ],
        store: true,
    });
}