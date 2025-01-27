import React from "react";
import { Message } from "../types/chat";
import { apiGetHello, apiSendMessage } from "./api";

type ApiQueryHandler = {
    onSuccess: React.Dispatch<React.SetStateAction<Message[]>>;
    onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type SendMessageProps = ApiQueryHandler & {
    text: string;
}

export const sendMessage = async ({ text, onSuccess, onLoading } : SendMessageProps): Promise<void> => {
    const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
    };
    
    onSuccess(prev => [...prev, userMessage]);
    onLoading(true);

    try {
        const response = await apiSendMessage(text);
        response.response.forEach((response: string) => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'bot',
                timestamp: new Date(),
            };
            onSuccess(prev => [...prev, botMessage]);
        })
    } catch (error) {
        console.error('Error:', error);
    } finally {
        onLoading(false);
    }
}

export const getHelloMessage = async ({ onLoading, onSuccess } : ApiQueryHandler) => {
    onLoading(true)
    try {
      const response = await apiGetHello();
      const helloMessage: Message = {
        id: Date.now().toString(),
        text: response?.message || '',
        sender: 'bot',
        timestamp: new Date()
      };
      onSuccess(prev => [...prev, helloMessage]);
    } catch (error) {
      console.error('Failed to fetch weather conditions:', error);
    } finally {
      onLoading(false);
    }
};