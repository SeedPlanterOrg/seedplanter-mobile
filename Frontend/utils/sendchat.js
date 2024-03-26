import AsyncStorage from '@react-native-async-storage/async-storage';

async function sendMessage(message, messages, startConversation) {
    // const IP = process.env.EXPO_PUBLIC_IP;
    // const PORT = process.env.EXPO_PUBLIC_PORT;

    let link = process.env.EXPO_PUBLIC_IP
    const env = process.env.NODE_ENV;

    if(env == "production"){
      link = process.env.EXPO_PUBLIC_DEPLOYMENT
    }
    
    // console.log(`IP: ${IP}, PORT: ${PORT}`); 
    const userId = await AsyncStorage.getItem('userId');

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
    const data = await response.json();
    return data.completion.choices[0].message.content;
}
module.exports = {sendMessage};
