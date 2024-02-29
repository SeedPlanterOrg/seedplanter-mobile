import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touchable, Pressable, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../navigation/tabs';

export default function SignupScreen() {
    const navigation = useNavigation()

    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
        password2: '',
    });

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
                        <Text style={styles.inputLabel}>Username</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.inputControls}
                                placeholder="Username"
                                placeholderTextColor="#6b7280"
                                value={form.userName}
                                onChangeText={userName => setForm({ ...form, userName})}
                            />
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
                                value={form.email}
                                onChangeText={email => setForm({ ...form, email})}
                            />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.inputControls}
                                placeholder="**********"
                                placeholderTextColor="#6b7280"
                                value={form.password}
                                onChangeText={password => setForm({ ...form, password})}
                            />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Confirm Password</Text>
                            <TextInput
                                secureTextEntry
                                style={styles.inputControls}
                                placeholder="**********"
                                placeholderTextColor="#6b7280"
                                value={form.password2}
                                onChangeText={password2 => setForm({ ...form, password2})}
                            />
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={() => navigation.navigate(Tabs)} >
                         <View style={styles.loginButton}>
                            <Text style={styles.buttonTxt}>REGISTER NOW</Text>
                         </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inline}>
                        <Text style={styles.signupLabel}>Already have an account?</Text>
                        <Pressable onPress={() => navigation.navigate("Login")} >
                         <Text style={styles.signupLabel2}>Login</Text>
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
