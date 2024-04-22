import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
          Text, 
          View, 
          Button, 
          SafeAreaView, 
          Image, 
          Touchable, 
          Pressable, 
          TouchableOpacity, 
          TextInput, 
          ImageBackground, 
          useColorScheme,
          Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
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
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <View style={styles.header}>
              <Animatable.Image
                source={require('../assets/FullLogoWhite.png')}
                style={styles.headerImg}
                duration={3000}
                iterationCount={1}
                iterationDelay={1000}
                animation="fadeInDown">
              </Animatable.Image>

              <Animatable.Text style={styles.subtitle} animation="fadeInUp" duration={3000} iterationCount={1} iterationDelay={1000}>
                Gardening App
              </Animatable.Text>
            </View>

            <View style={styles.formAction}>
              <Animatable.Text style={styles.buttonTxt} animation="fadeIn" duration={2000} iterationCount={1} iterationDelay={1000}>Tap To Continue</Animatable.Text>
            </View>

            <StatusBar style="auto" />
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 265,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#61b450',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75,
    height: 200,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
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
    marginTop: -45,
  },
});