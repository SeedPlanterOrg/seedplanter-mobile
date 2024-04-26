/*
    *File: App.js
    *Description: 
        *This is the main component for the app, it handles all routes for navigation
        *It contains the stack navigation that has the different route screens
        *It handles dark and light mode switch
    *Functions: n/a
*/

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
import { darkTheme, lightTheme } from './styles/theme'
import { AuthProvider } from './context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Main App component
const App = () => {

  // Get the color scheme
  const colorScheme = useColorScheme() || 'light';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
