import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touchable, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../navigation/tabs';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
// import { IP, PORT } from "@env"
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorMessage from '../components/ErrorMessage';

export default function LoginScreen() {
  const navigation = useNavigation()

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const IP = process.env.EXPO_PUBLIC_IP;
  const PORT = process.env.EXPO_PUBLIC_PORT;
  

  const handleLogin = async () => {
    try {
      const response = await fetch(`${IP}:${PORT}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // const num = await AsyncStorage.getItem('userId');  
      if (!response.ok) {
        setErrorMessage('Invalid credentials, could not log in');
        throw new Error('Error logging in');
      }

      console.log(response);
  
      const data = await response.json();

      console.log(data);
  
      // Store the user ID and token in local storage or in-memory state
      await AsyncStorage.setItem('userId', data.userId);
      await AsyncStorage.setItem('token', data.token);
  
      // Navigate to the next screen
      navigation.navigate(Tabs);
  
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid credentials, could not log in');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('../assets/LogoActiveGreen.png')}
            style={styles.headerImg}
            alt="logo"
          />
          <Text style={styles.title}>Sign in to SeedPlanter</Text>
          <Text style={styles.subtitle}>Get access to your plants now</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControls}
              placeholder="example@example.com"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControls}
              placeholder="**********"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <ErrorMessage message={errorMessage} />
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin} >
              <View style={styles.loginButton}>
                <Text style={styles.buttonTxt}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inline}>
            <Text style={styles.signupLabel}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate("Signup")} >
                <Text style={styles.signupLabel2}> Sign up</Text>
            </Pressable>
          </View>

        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#757575',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  inputControls: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  form: {
    marginBotton: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  loginButton: {
    backgroundColor: '#61b450',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#61b450',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  signupLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  signupLabel2: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  inline: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
});