/*
    *File: ChatBotScreen.js
    *Description: 
        *This file is responsible for creating and exporting the chatbot modal that can be utilized in other files
        *The file contains multiple functions to render vital items that are used for displaying and sending chat messages
    *Functions: useCallback()         - used for sending messages
                renderInputToolbar()  - used fir rendering the input box
                renderComposer()      - used for rendering the composer
                renderChatFooter()    - used for rendering wether the chatbot is typing or not
                renderSendButton()    - used for rendering the send button
                renderBubble()        - used for rendering the chat bubble with text in it
*/

import { StyleSheet, Text, View, SafeAreaView, Keyboard, useColorScheme, Modal, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { GiftedChat, InputToolbar, Composer, Bubble, Send } from 'react-native-gifted-chat'
import { sendMessage } from '../utils/sendchat';
import logo from '../assets/LogoActiveGreen.png';
import { useTheme, ThemeProvider } from 'styled-components/native';

// import { Markdown } from 'react-native-markdown-display';

const ChatBotScreen = ({ onClose, modalVisible }) => {
  console.log('Modal visible:', modalVisible);

  const [messages, setMessages] = useState([])
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [startConversation, setStartConversation] = useState(false);

  const theme = useTheme();


  // sets message when clicking on the chatbot
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome back to SeedPlanter! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: logo,
        }
      },
    ])
  }, [])

  // gets message from bot
  const onSend = useCallback((messages = []) => {
    setIsBotTyping(true);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    
    // Send the message to the chatbot
    sendMessage(messages[0].text, messages, startConversation)
      .then(response => {
        setIsBotTyping(false);
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, {
            _id: Math.random(),
            text: response,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: logo,
            },
          }),
        )
        if (!startConversation) {
          setStartConversation(true);
        }
      })
    // }
  }, [startConversation]);

  // various functions to render the different properties of the chat bot such as bubble, input, etc.
  const renderInputToolbar = (props) => (
    <InputToolbar {...props} containerStyle={[styles.inputToolbar, { backgroundColor: theme.gardenCard }]} />
  );

  const renderComposer = (props) => (
    <Composer {...props} textInputStyle={[styles.composer, { color: theme.text }]} />
  );

  // renders the footer of the chatbot
  const renderChatFooter = (props) => {
    if (isBotTyping) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Typing...</Text>
        </View>
      );
    }
    return null;
  };

  // renders the send button
  const renderSendButton = (props) => {
    return (
      <Send {...props}>
        <View style={{
          marginBottom: 0,
          borderWidth: 0,
          width: 34,
          height: 34,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1DB954'
        }}>
          <FontAwesome name="send" size={18} color="white" />
        </View>
      </Send>
    );
  };

  // renders the message text in Markdown format
  // const renderMessageText = (props) => {
  //   const { currentMessage } = props;
  //   return (
  //     <View>
  //       <Markdown>{currentMessage.text}</Markdown>
  //     </View>
  //   );
  // };

  // renders the bubble for the chatbot
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1DB954',
          },
          left: {
            backgroundColor: theme.gardenCard
          }
        }}
        textStyle={{
          left: {
            color: theme.text, // text color for bot's messages
          },
        }}
      />
    );
  };

  // backgroundColor: theme.gardenBackground

  return (
    // ThemeProvider is used to change the theme of the chatbot
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.gardenBackground }}>

        {/* Modal for the chatbot */}
        <Modal
          animationType="slide"
          presentationStyle='pageSheet'
          transparent={false}
          visible={modalVisible}>

          <View style={[styles.modalContent, { backgroundColor: theme.chatColor }]}>
            {/* Backbutton */}
            <View style={{ backgroundColor: theme.navbar }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[styles.Backbutton, { width: 100, height: 100 }]}>
                  <Button title="Close" color={theme.text} onPress={onClose}></Button>
                </View>
                {/* Designed to look like iMessage contact */}
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: 100, height: 100, marginRight: 10, }}>
                  <View style={styles.circlesty}>
                    <Image style={styles.ImgSize} source={require('../assets/LogoActiveGreen.png')} tintColor={theme.navbar}></Image>
                  </View>
                  <Text style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 30, color: theme.text, fontWeight: 'bold', }}>Plant Bot</Text>
                </View>
                <View style={{ height: 100, width: 100 }}>
                  <Text style={{ alignSelf: 'center' }}></Text>
                </View>
              </View>
            </View>

            {/* Chatbot - uses react-native-gifted-chat library to render the chatbot interface*/}
            <GiftedChat
              messages={messages}
              onSend={messages => onSend(messages)}
              renderInputToolbar={renderInputToolbar}
              minInputToolbarHeight={70}
              renderChatFooter={renderChatFooter}
              renderBubble={renderBubble}
              renderSend={renderSendButton}
              renderComposer={renderComposer}
              placeholder="Ask me a gardening question..."
              user={{
                _id: 1,
              }}
            />

          </View>
        </Modal>
        
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default ChatBotScreen;

// chatbot style screen
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputToolbar: {
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  composer: {
    borderRadius: 25,
  },
  footerContainer: {
    // marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footerText: {
    fontSize: 14,
    color: 'grey',
  },
  ModalContainer: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
  },
  Backbutton: {
    marginTop: 20,
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center'
  },
  Searchbutton: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  selectModalContainer: {
    backgroundColor: '#fff',
    height: 270,
    width: 270,
    borderRadius: 20,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImgSize: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  circlesty: {
    backgroundColor: "#1DB954",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
});