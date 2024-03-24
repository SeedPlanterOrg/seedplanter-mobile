import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat } from 'react-native-gifted-chat'
import { sendMessage } from '../utils/sendchat'; 

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([])
  const navigation = useNavigation();
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    sendMessage(messages[0].text)
      .then(response => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, {
            _id: Math.random(),
            text: response,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          }),
        )
      })
  }, [])

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
       display: 'none',
      }
    });
    return () => navigation.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
    <Icon
      name="arrow-back"
      size={30}
      color="#fff"
      style={{
        backgroundColor: 'green',
        borderRadius: 15,
        padding: 5,
      }}
      onPress={() => navigation.goBack()} // This will navigate back
    />
      <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});