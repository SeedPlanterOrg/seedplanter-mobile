// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createGarden, getGarden } from '../utils/http';
// import Tabs from '../navigation/tabs';

let link = process.env.EXPO_PUBLIC_IP
const env = process.env.EXPO_PUBLIC_ENV;

if(env === "production"){
  link = process.env.EXPO_PUBLIC_DEPLOYMENT;
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
  
        const data = await response.json();
  
        try {
          await AsyncStorage.setItem('userId', data.userId);
          await AsyncStorage.setItem('token', data.token);

          const gardenId = await getGarden(data.userId); //get gardenId
          console.log(gardenId.garden[0]._id);
          const g_id = gardenId.garden[0]._id;
          await AsyncStorage.setItem('gardenId', g_id); //set gardenId in local storage

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

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);