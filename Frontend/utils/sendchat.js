import AsyncStorage from '@react-native-async-storage/async-storage';

async function sendMessage(message, messages, startConversation) {
    // const IP = process.env.EXPO_PUBLIC_IP;
    // const PORT = process.env.EXPO_PUBLIC_PORT;

    const DEPLOYMENT = process.env.EXPO_PUBLIC_IP;
    
    // console.log(`IP: ${IP}, PORT: ${PORT}`); 
    const userId = await AsyncStorage.getItem('userId');

    const response = await fetch(`${DEPLOYMENT}/chat/sendmessage`, {
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
    const data = await response.json();
    return data.completion.choices[0].message.content;
}
module.exports = {sendMessage};
