import { City, getWeather } from "./weatherHelper";

export const prompts = {
    systemPrompt: "You are a helpful assistant that provides weather-based advice. You should use the weather conditions of a city to provide advice to the user.",
    systemPromptForSEO: "You are a helpful assistant that knows about building websites. You should use your knowledge to provide advice to the user.",
    basicPrompt: (city: City) => `Should I wear a rain jacket in ${city}`,
    hardcodedAgentPrompt: (city: City) => `Should I use a rain jacket in ${city} based on the following weather conditions I get from official sources?: 'current weather in ${city}: ${getWeather(city)}'`,
}
