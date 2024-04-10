import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touchable, Pressable, TouchableOpacity, TextInput, ImageBackground, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../navigation/tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';

export default function WelcomeScreen() {
    const navigation = useNavigation()
    const theme = useTheme();


    return (
      <ThemeProvider theme={theme}>
        <LinearGradient
            colors={theme.welcomeBG}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/FullLogoWhite.png')}
                        style={styles.headerImg}
                        alt="logo"
                    />
                    <Text style={styles.subtitle}>Gardening App</Text>
                </View>

                <View style={styles.formAction}>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                        <View style={styles.loginButton}>
                            <Text style={styles.buttonTxt}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <StatusBar style="auto" />
            </SafeAreaView>
        </LinearGradient>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
  container: {
      padding: 24,
      flex: 1,
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
      marginVertical: 250,
    },
    buttonTxt: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    },
    header: {
      marginVertical: 36,
    },
    headerImg: {
      width: 300,
      height: 300,
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
      fontWeight: 'bold',
      color: '#e3e4e6',
      textAlign: 'center',
    },
});