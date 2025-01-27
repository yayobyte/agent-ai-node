export interface Weather {
  temperature: number;
  condition: string;
  location: string;
}
  
export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export {}