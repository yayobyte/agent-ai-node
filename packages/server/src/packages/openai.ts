import OpenAI from "openai";
import dotenv from "dotenv";
import { prompts } from "./prompts";
import { availableActions, City } from "./weatherHelper";
import { extractAction } from "./promptParser";

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
    const completion = await reActPromptOneLoop(city)
    return completion?.choices[0]?.message?.content
}

/* REAL FUN STARTS HERE */

//This function uses a mocked weather api with a reAct Prompt but only does one loop
async function reActPrompt(city: City) {
    return await openai.chat.completions.create({
        model: MODELS.GPT35TURBO,
        messages: [
            { role: "system", content: prompts.reActSystemPrompt() },
            { role: "user", content: prompts.hardcodedAgentPrompt(city) },
        ],
        store: true,
    });
}

async function reActPromptOneLoop(city: City) {
    console.log('--------------------------------------')
    let message = ''
    const completion = await openai.chat.completions.create({
        model: MODELS.GPT35TURBO,
        messages: [
            { role: "system", content: prompts.reActSystemPromptWithJsonFunction() },
            { role: "user", content: prompts.hardcodedAgentPrompt(city) },
        ],
        store: true,
    });

    message = completion.choices[0].message.content || ''

    console.log(message)
    const action = extractAction(message)

    // Call our available actions
    if (action?.function && action.parameter) { 
        const weatherInfo = availableActions[action.function](action.parameter as City)
        const completion2 = await openai.chat.completions.create({
            model: MODELS.GPT35TURBO,
            messages: [
                { role: "system", content: prompts.reActSystemPromptWithJsonFunction() },
                { role: "user", content: prompts.hardcodedAgentPrompt(city) },
                { role: "user", content: 'Action_Response: ' + weatherInfo },
            ],
            store: true,
        });

        const message2 = completion.choices[0].message.content || ''
        console.log(message2)
        return completion2
    }

    return completion
}