type Functions = 'getWeather' | 'sayNotingRelevant';

interface Action {
  function: 'getWeather' | 'sayNotingRelevant';
  parameter?: string;
  city?: string;
}

export const extractAction = (text: string): Action | null => {
  try {
    // Match content between Action: { and }
    const actionMatch = text.match(/Action:\s*({[\s\S]*?})/);
    
    if (!actionMatch || !actionMatch[1]) {
      return null;
    }

    // Parse the matched JSON
    const action = JSON.parse(actionMatch[1]) as Action;
    
    // Validate action structure and normalize parameters
    if (!action.function || !['getWeather', 'sayNotingRelevant'].includes(action.function)) {
      return null;
    }

    // Handle both parameter and city fields
    const parameter = action.parameter || action.city;
    
    // Return normalized action
    return {
      function: action.function,
      parameter: parameter
    };

  } catch (error) {
    console.error('Failed to parse action:', error);
    return null;
  }
};