import { StyleSheet, View, Text } from 'react-native';
import { Message } from '@weather-chat/common/src/types/chat';

interface Props {
  message: Message;
}

export const MessageBubble = ({ message }: Props) => (
  <View style={[
    styles.container,
    message.sender === 'user' ? styles.userContainer : styles.botContainer
  ]}>
    <Text style={styles.timestamp}>
      {new Date(message.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </Text>
    <View style={[
      styles.bubble,
      message.sender === 'user' ? styles.userBubble : styles.botBubble
    ]}>
      <Text style={[
        styles.text,
        message.sender === 'user' ? styles.userText : styles.botText
      ]}>
        {message.text}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '70%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  bubble: {
    padding: 12,
    borderRadius: 8,
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 14,
  },
  userText: {
    color: '#FFFFFF',
  },
  botText: {
    color: '#1F2937',
  }
});