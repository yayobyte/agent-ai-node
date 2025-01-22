import { Message } from '../types';

interface Props {
  message: Message;
}

export const MessageBubble = ({ message }: Props) => (
  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} mb-4`}>
    <span className="text-xs text-gray-400 mb-1">
      {new Date(message.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </span>
    <div className={`max-w-[70%] p-3 rounded-lg ${
      message.sender === 'user' 
        ? 'bg-blue-500 text-white rounded-tr-none' 
        : 'bg-gray-200 text-gray-800 rounded-tl-none'
    }`}>
      {message.text}
    </div>
  </div>
);