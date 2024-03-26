import { StyleSheet, Text, View, Appearance, useColorScheme} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from './navigation/tabs';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { ThemeProvider } from 'styled-components/native';
// import { Appearance } from 'react-native-appearance';

const Stack = createNativeStackNavigator();

export const lightTheme = {
  background: '#e8ecf4',
  gardenCard: '#FFFFFF',
  gardenBackground: '#FFFFFF',
  text: '#000000',
  navbar: 'white',

  // Add more color variables as needed
};

export const darkTheme = {
  background: '#191919',
  gardenCard: '#2C2C2C',
  gardenBackground: '#1E1E1E',
  text: '#FFFFFF',
  navbar: '#191919'

  // Add more color variables as needed
};

const App = () => {

  const colorScheme = useColorScheme() || 'light';

  return (
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" 
          screenOptions={{
            headerBackVisible: false,
            headerShown: false,
          }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
