import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

interface ChatHeaderProps {
  botName?: string;
  model?: string;
  avatarUrl?: any; // Change to any for now to handle both URI and require
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  botName = "GPT Platform",
  model = "gpt-3.5-turbo",
  avatarUrl = require('../../assets/icons8-chatear-100.png')
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={avatarUrl}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.botName}>{botName}</Text>
          <Text style={styles.model}>{model}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  botName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  model: {
    fontSize: 14,
    color: '#6B7280',
  },
});