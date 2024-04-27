/*
    *File: LoginScreen.js
    *Description: 
        *This file is responsible for creating the styling and look of the login screen
    *Functions: onLoginPress()        - used to handle the login process
*/

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touchable, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../navigation/tabs';
import { TextInput, Appearance, useColorScheme} from 'react-native';
import { TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorMessage from '../components/ErrorMessage';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { useAuth } from '../context/AuthContext';


export default function LoginScreen() {
  const navigation = useNavigation()

  // states to deal with various values 
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const theme = useTheme();
  
  // function to handle the login credentials process
  const onLoginPress = async () => {
    try {
      await handleLogin(email, password);
      navigation.navigate(Tabs);
    } catch (error) {
      setErrorMessage('Invalid credentials, could not log in');
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
    <LinearGradient style={styles.container}
      colors={theme.loginBG}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            {/* header image, title, subtitle */}
            <Image 
              source={require('../assets/LogoActiveGreen.png')}
              style={styles.headerImg}
              alt="logo"
            />
            <Text style={[styles.title, { color: theme.text }]}>Sign in to SeedPlanter</Text>
            <Text style={styles.subtitle}>Get access to your plants now</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              {/* various input fields required to cause the user to login */}
              <Text style={[styles.inputLabel, {color: theme.text}]}>Email address</Text>
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
              <Text style={[styles.inputLabel, {color: theme.text}]}>Password</Text>
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

            {/* Button that logs the user in */}
            <View style={styles.formAction}>
              <TouchableOpacity onPress={onLoginPress} >
                <View style={styles.loginButton}>
                  <Text style={styles.buttonTxt}>LOGIN</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Button to naviagte user to signup page if they dont have an account*/}
            <View style={styles.inline}>
              <Text style={[styles.signupLabel, {color: theme.text}]}>Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate("Signup")} >
                  <Text style={[styles.signupLabel, {color: theme.text}]}> Sign up</Text>
              </Pressable>
            </View>

          </View>

          <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
    </ThemeProvider>
  );
}

// style sheet for login screen
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