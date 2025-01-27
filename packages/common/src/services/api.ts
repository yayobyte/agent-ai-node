export interface ChatResponse {
  response: string[];
}

const PORT = 3001
const HOST = 'http://localhost'

export const apiSendMessage = async (message: string): Promise<ChatResponse> => {
  const endpoint = `${HOST}:${PORT}/api/chat`
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        userPrompt: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch: ${error.message}`);
    }
    throw error;
  }
};

export const apiGetHello = async (): Promise<{ message: string }> => {
  const endpoint = `${HOST}:${PORT}/`
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch: ${error.message}`);
    }
    throw error;
  }
};