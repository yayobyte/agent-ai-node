import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { getHelloMessage, sendMessage } from '@weather-chat/common/src/services/middleware';
import { Message } from '../types';
import { ChatHeader } from './ChatHeader';

export const ChatContainer = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getHelloMessage({ onSuccess: setMessages, onLoading: setLoading });
  }, [])

  const handleSendMessage = async (text: string) => {
    await sendMessage({ text, onSuccess: setMessages, onLoading: setLoading });
    scrollToBottom();
  };

  return (
    <div className="w-[400px] mx-auto h-screen flex flex-col border border-gray-300 rounded-lg shadow-lg shadow-slate-500">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};