import React from 'react';

import ChatGPTIcon from '../assets/icons8-chatear-100.svg'

interface ChatHeaderProps {
  botName?: string;
  model?: string;
  avatarUrl?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  botName = "GPT Platform",
  model = "gpt-3.5-turbo",
  avatarUrl = ChatGPTIcon
}) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm rounded-t-lg">
      <div className="flex items-center space-x-4">
        <img 
          src={avatarUrl} 
          alt="Bot Avatar" 
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{botName}</h2>
          <p className="text-xs text-gray-500">Model: {model}</p>
        </div>
      </div>
    </div>
  );
};