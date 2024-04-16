import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touchable, Pressable, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ErrorMessage from '../components/ErrorMessage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../navigation/tabs';
// import { createGarden, getGarden } from '../utils/http';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen() {
    const navigation = useNavigation()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const IP = process.env.EXPO_PUBLIC_IP;
    const { handleSignup } = useAuth();

  let link = process.env.EXPO_PUBLIC_IP

    const env = process.env.EXPO_PUBLIC_ENV;

    if(env === "production"){
      link = process.env.EXPO_PUBLIC_DEPLOYMENT;
    }

    const onSignupPress = async () => {
      setNameError(null);
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
      setErrorMessage(null);
    
      if (name === "") {
        setNameError("Please tell us your name!");
        return;
      }
    
      if (email === "") {
        setEmailError("Email is required");
        return;
      }
      if (!re.test(email) ) {
        setEmailError("Email is not valid");
        return;
      }
      if (password === "") {
        setPasswordError("Password is required");
        return;
      }
      if (confirmPassword === "") {
        setConfirmPasswordError("Confirm password is required");
        return;
      }
      if (password.length < 6 || confirmPassword.length < 6) { 
        setPasswordError("Password must be at least 6 characters long");
        setConfirmPasswordError("Password must be at least 6 characters long");
        return;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Please make sure the passwords match");
        setPasswordError("Please make sure the passwords match");
        return;
      }


    
      try {
        await handleSignup(name, email, password);
        navigation.navigate(Tabs);

      } catch (error) {

        console.log(error);
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
                    <Text style={styles.title}>Sign up for SeedPlanter</Text>
                    <Text style={styles.subtitle}>Start planting your garden today!</Text>
                </View>
                <View style={styles.form}>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Name</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.inputControls}
                                placeholder="Name"
                                placeholderTextColor="#6b7280"
                                value={name}
                                onChangeText={setName}
                            />
                        <ErrorMessage message={nameError} />
                    </View>

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
                                onChangeText={setEmail}
                            />
                          <ErrorMessage message={emailError} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.inputControls}
                                placeholder="**********"
                                placeholderTextColor="#6b7280"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <ErrorMessage message={confirmPasswordError} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Confirm Password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.inputControls}
                                placeholder="**********"
                                placeholderTextColor="#6b7280"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        <ErrorMessage message={confirmPasswordError} />

                    </View>
                    <ErrorMessage message={errorMessage} />

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={onSignupPress} >
                         <View style={styles.loginButton}>
                            <Text style={styles.buttonTxt}>REGISTER NOW</Text>
                         </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inline}>
                        <Text style={styles.signupLabel}>Already have an account?</Text>
                        <Pressable onPress={() => navigation.navigate("Login")} >
                         <Text style={styles.signupLabel2}> Login</Text>
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
