import React, { useState, useEffect, memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/JournalScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import { DefaultTheme } from '@react-navigation/native';
import { useTheme, ThemeProvider } from 'styled-components/native';
import { styled } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [addChatModalVisible, setAddChatModalVisible] = useState(false);
    const theme = useTheme();
    const navigation = useNavigation();

    const ChatBotModal = () => <View></View>

    const closeChatModal = () => {
        console.log('Close Modal:', addChatModalVisible);
        setAddChatModalVisible(false);
    };
    const openChatModal = () => {
        console.log('Open Modal:', addChatModalVisible);
        setAddChatModalVisible(true);
    };

    //const CustomOpacity = ({onPress}) => (
    //    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
    //        <Entypo name="chat" size={30} style={{ color: theme.text }} />
    //    </TouchableOpacity>
    //);

    return (
        <ThemeProvider theme={theme}>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        flex: 1,
                        position: 'absolute',
                        height: 80,
                        borderRadius: 50,
                        elevation: 0,
                        paddingBottom: 15,
                        borderTopWidth: 0
                    },
                    tabBarBackground: () => (
                        <BlurView
                            intensity={80}
                            style={{
                                flex: 1,
                                overflow: "hidden",
                                backgroundColor: "transparent"
                            }}>
                        </BlurView>
                    ),
                }}>
                <Tab.Screen name="My Garden" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={require('../assets/home3.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1DB954' : theme.text
                                }}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.navbar,
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 23,
                        color: theme.text,
                    },
                    headerTitleAlign: 'left',
                }} />

                <Tab.Screen name="Journal" component={JournalScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={require('../assets/book6.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1DB954' : theme.text
                                }}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.navbar,
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 23,
                        color: theme.text,
                    },
                    headerTitleAlign: 'left',
                }} />

                <Tab.Screen
                    name="AI Plantbot"
                    component={ChatBotModal}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image source={require('../assets/chat6.png')}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#1DB954' : theme.text
                                }}
                            />
                        ),
                        tabBarButton: () => (
                            <TouchableOpacity style={styles.buttonStyle} onPress={openChatModal}>
                                <Entypo name="chat" size={30} style={{ color: theme.text, marginTop: 17}} />
                                <ChatBotScreen onClose={closeChatModal} modalVisible={addChatModalVisible}/>
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: theme.navbar,
                            shadowColor: 'transparent',
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 23,
                            color: theme.text,
                        },
                        headerTitleAlign: 'left',
                    }} />

                <Tab.Screen name="Search Plants" component={CatalogScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={require('../assets/search6.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1DB954' : theme.text
                                }}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.navbar,
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 23,
                        color: theme.text,
                    },
                    headerTitleAlign: 'left',
                }} />

                <Tab.Screen name="My Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={require('../assets/profile6.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#1DB954' : theme.text
                                }}
                            />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: theme.navbar,
                        shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 23,
                        color: theme.text,
                    },
                    headerTitleAlign: 'left',
                }} />

            </Tab.Navigator>
        </ThemeProvider>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    shadowing: {
        shadowColor: '#68b454',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonStyle: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#1DB954',
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowOffset: { width: 1, height: 1 },
    },
});