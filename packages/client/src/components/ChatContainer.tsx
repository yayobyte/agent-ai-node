import { useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { sendMessage } from '../services/api';
import { Message } from '../types';
import { ChatHeader } from './ChatHeader';

const botMessage: Message = {
  id: (Date.now() + 1).toString(),
  text: 'Hello! How can I help you today?',
  sender: 'bot',
  timestamp: new Date(),
};

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([botMessage]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await sendMessage(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] mx-auto h-screen flex flex-col border border-gray-300 rounded-lg shadow-lg shadow-slate-500">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {loading && <div className="text-center p-2.5 text-gray-500">Loading...</div>}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};