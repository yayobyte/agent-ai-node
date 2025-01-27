import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { getHelloMessage, sendMessage } from '@weather-chat/common/src/services/middleware';
import { Message } from '@weather-chat/common/src/types/chat';

export function ChatContainer() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getHelloMessage({ onSuccess: setMessages, onLoading: setLoading });
  }, []);

  const handleSendMessage = async (text: string) => {
    await sendMessage({ text, onSuccess: setMessages, onLoading: setLoading });
    scrollToBottom();
  };

  return (
    <View style={styles.container}>
      <ChatHeader />
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messageList}
        contentContainerStyle={styles.messageContent}
      >
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ScrollView>
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    padding: 20,
    flexGrow: 1,
  }
});