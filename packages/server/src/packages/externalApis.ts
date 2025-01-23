import { City, getWeather } from "./weatherHelper";

export const externalApis = {
    getWeather: (city: City) => getWeather(city)
} as const;