/*
    *File: App.js
    *Description: 
        *This is the main component for the app, it handles all routes for navigation
        *It contains the stack navigation that has the different route screens
        *It handles dark and light mode switch
    *Functions: n/a
*/

/* 
  Mobile App Development II -- COMP.4631 Honor Statement 
  The practice of good ethical behavior is essential for maintaining 
  good order in the classroom, providing an enriching learning 
  experience for students, and training as a practicing computing 
  professional upon graduation. This practice is manifested in the 
  University's Academic Integrity policy. Students are expected to 
  strictly avoid academic dishonesty and adhere to the Academic 
  Integrity policy as outlined in the course catalog. Violations 
  will be dealt with as outlined therein. All programming assignments 
  in this class are to be done by the student alone unless otherwise 
  specified. No outside help is permitted except the instructor and 
  approved tutors. 
  I certify that the work submitted with this assignment is mine and 
  was generated in a manner consistent with this document, the course 
  academic policy on the course website on Blackboard, and the UMass 
  Lowell academic code. 

  Date:  4-26-2024
  Names: Erson Ramirez, Shivam Patel, Daniel Bergeron, Anthony Kitowicz
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
