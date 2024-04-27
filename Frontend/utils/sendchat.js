/*
    File: sendchat.js
    Description:
        * This file is responsible for sending messages to the chatbot
        * Sends a POST request to the backend to send a message to the chatbot
        * Recieves a response from the backend with the chatbot's response
    Function: sendMessage() - Function used to send a message to the chatbot
*/
import AsyncStorage from '@react-native-async-storage/async-storage';

async function sendMessage(message, messages, startConversation) {
    // const IP = process.env.EXPO_PUBLIC_IP;
    // const PORT = process.env.EXPO_PUBLIC_PORT;

    // const link = `http://${IP}:${PORT}`;
    let link = process.env.EXPO_PUBLIC_IP
    const env = process.env.EXPO_PUBLIC_ENV;

    if(env == "production"){
      link = process.env.EXPO_PUBLIC_DEPLOYMENT
    }
    
    // Get the userId from AsyncStorage
    const userId = await AsyncStorage.getItem('userId');

    // Send a POST request to the backend to send a message to the chatbot
    const response = await fetch(`${link}/chat/sendmessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message,
            userId: userId,
            messages: messages,
            startConversation: startConversation
        })
    });
    // Get the response from the backend
    const data = await response.json();
    return data.completion.choices[0].message.content;
}
module.exports = {sendMessage};
