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
    <div className="chat-container">
      <ChatHeader />
      <div className="messages">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};