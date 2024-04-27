/*
  File: AuthContext.js
  Description:
    * This file is responsible for handling user authentication
    * The file contains functions to handle user login and signup
    * Creates a global context for user authentication that can be accessed by other files
    * Uses AsyncStorage to store user data locally
    * Uses the fetch API to send requests to the backend
    * Uses the getGarden function to get the gardenId of the user
    * Uses the createGarden function to create a garden for the user in the sisgnup function
    * 
*/

// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createGarden, getGarden } from '../utils/http';

let link = process.env.EXPO_PUBLIC_IP
const env = process.env.EXPO_PUBLIC_ENV;

if(env === "production"){
  link = process.env.EXPO_PUBLIC_DEPLOYMENT;
}

// Create a global context for user authentication
export const AuthContext = createContext();

// Create a provider for user authentication
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${link}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (!response.ok) {
          reject('Error logging in');
          return;
        }
        
        // Get the user ID and token from the response
        const data = await response.json();
  
        try {
          // Set the user ID and token in AsyncStorage
          await AsyncStorage.setItem('userId', data.userId);
          await AsyncStorage.setItem('token', data.token);

          // Get the gardenId of the user
          const gardenId = await getGarden(data.userId); //get gardenId
          console.log(gardenId.garden[0]._id);
          const g_id = gardenId.garden[0]._id;
          await AsyncStorage.setItem('gardenId', g_id); //set gardenId in local storage

          // Set the user ID, token, and gardenId in the state
          setUser({
            id: data.userId,
            token: data.token,
          });
  
          resolve();
        } catch (error) {
          console.error('Error setting data in AsyncStorage:', error);
          reject(error);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  // Function to handle user signup
  const handleSignup = (name, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${link}/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
  
        if (!response.ok) {
          reject('Error signing up');
          return;
        }
  
        // Get the user ID and token from the response
        const data = await response.json();
  
        try {

          // Set the user ID and token in AsyncStorage
          await AsyncStorage.setItem('userId', data.userId);
          await AsyncStorage.setItem('token', data.token);
  
          // Get the gardenId of the user
          const gardenId = await getGarden(data.userId); // create garden and get gardenId
          await AsyncStorage.setItem('gardenId', gardenId.garden[0]._id); //set gardenId in local storage
  
          // Set the user ID, token, and gardenId in the state
          setUser({
            id: data.userId,
            token: data.token,
            gardenId: gardenId.garden[0]._id,
          });
  
          resolve(); // resolve the promise here
        } catch (error) {
          console.error('Error setting data in AsyncStorage:', error);
          reject(error);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  };

  // Return the AuthProvider with the user state and the login and signup functions
  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);