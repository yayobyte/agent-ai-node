const WEATHER_CONDITIONS = {
    BAKU: 'Sunny',
    LONDON: 'Rainy',
    NEW_YORK: 'Snowy',
    BOGOTA: 'Foggy',
    HELSINKI: 'Cloudy',
    DOHA: 'Sandstorm',
    TOKYO: 'Windy',
    ABU_DABI: 'Sunny', //Intentional typo
    DELI: 'Hazy', //Intentional typo
} as const;

export type City = keyof typeof WEATHER_CONDITIONS;

export function getWeather(city: City) {
    return WEATHER_CONDITIONS[city] || 'Unknown';
}
