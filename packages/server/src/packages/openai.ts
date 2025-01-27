import OpenAI from "openai";
import dotenv from "dotenv";
import { prompts } from "./prompts";
import { availableActions, City } from "./weatherHelper";
import { extractAction } from "./promptParser";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const MAX_LOOPS = 5

const MODELS = {
    GPT35TURBO: 'gpt-3.5-turbo',
    GPT40MINI: 'gpt-4o-mini',
    GPT40: 'gpt-4o',
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });
export async function getCompletion(city: City, userPrompt: string) {
    return await reActPromptFiveLoops(userPrompt)
}

/* REAL FUN STARTS HERE */

//This function uses a mocked weather api with a reAct Prompt but only does one loop
async function reActPrompt(city: City) {
    const completion =  await openai.chat.completions.create({
        model: MODELS.GPT35TURBO,
        messages: [
            { role: "system", content: prompts.reActSystemPrompt() },
            { role: "user", content: prompts.hardcodedAgentPrompt(city) },
        ],
        store: true,
    });
    const response = completion?.choices[0]?.message?.content || ''
    return [response]
}

async function reActPromptOneLoop(userPrompt: string) {
    console.log('--------------------------------------')
    let messageFromAgent = ''
    let messageFromAgent2 = ''
    const completion = await openai.chat.completions.create({
        model: MODELS.GPT35TURBO,
        messages: [
            { role: "system", content: prompts.reActSystemPromptWithJsonFunction() },
            { role: "user", content: prompts.dynamicAgentPrompt(userPrompt) },
        ],
        store: true,
    });

    messageFromAgent = completion.choices[0].message.content || ''

    console.log(messageFromAgent)
    const action = extractAction(messageFromAgent)

    // Call our available actions
    if (action?.function && action.parameter) { 
        const weatherInfo = availableActions[action.function](action.parameter as City)
        const completion2 = await openai.chat.completions.create({
            model: MODELS.GPT35TURBO,
            messages: [
                { role: "system", content: prompts.reActSystemPromptWithJsonFunction() },
                { role: "user", content: prompts.dynamicAgentPrompt(userPrompt) },
                { role: "user", content: 'Action_Response: ' + weatherInfo },
            ],
            store: true,
        });

        messageFromAgent2 = completion2.choices[0].message.content || ''
        console.log(messageFromAgent2)
    }

    return messageFromAgent2 ? [messageFromAgent, messageFromAgent2] : [messageFromAgent]
}

async function reActPromptFiveLoops(userPrompt: string) {
    let loops = 0
    let responseToTheUser = []
    const messages = [
        { role: "system" as const, content: prompts.reActSystemPromptWithJsonFunction() },
        { role: "user" as const, content: prompts.dynamicAgentPrompt(userPrompt) },
    ];
    while (loops<MAX_LOOPS) {
        console.log({loop: loops}, '--------------------------------------')

        let messageFromAgent = ''
        const completion = await openai.chat.completions.create({
            model: MODELS.GPT35TURBO,
            messages,
            store: true,
        });

        messageFromAgent = completion.choices[0].message.content || ''
        console.log(messageFromAgent)
        const action = extractAction(messageFromAgent)

        responseToTheUser.push(messageFromAgent)

        // Call our available actions
        if (action?.function && action.parameter) { 
            const weatherInfo = availableActions[action.function](action.parameter as City)
            // Push the message to the messages array so the next iteration can use it
            messages.push({ role: "user", content: 'Action_Response: ' + weatherInfo })
        }
        loops++
    }

    return responseToTheUser
}