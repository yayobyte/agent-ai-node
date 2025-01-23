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

export function getAllWeatherConditions() {
    return Object.entries(WEATHER_CONDITIONS).map(([city, weather]) => ({
        city,
        weather
    }));
}

export const cityExtractor = (text: string): City | null => {
  // Convert text to uppercase for comparison
  const upperText = text.toUpperCase();
  
  // Get all available cities
  const cities = Object.keys(WEATHER_CONDITIONS) as City[];
  
  // Find first matching city
  const foundCity = cities.find(city => upperText.includes(city));
  
  return foundCity || null;
};
