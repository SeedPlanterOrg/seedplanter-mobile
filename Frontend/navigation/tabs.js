import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/JournalScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import { DefaultTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#98FF98'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, }}>
            <Tab.Screen name="My Garden" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/home.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0A6522' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

            <Tab.Screen name="Journal" component={JournalScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/book2.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0A6522' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

            <Tab.Screen name="Plantbot" component={ChatBotScreen} options={{
                tabBarIcon: ({focused}) => (
                    <Image source={require('../assets/chat2.png')}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton { ... props }/>
                )
            }}/>

            <Tab.Screen name="Search Plants" component={CatalogScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/search2.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0A6522' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

            <Tab.Screen name="My Profile" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/profile2.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#0A6522' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

        </Tab.Navigator>
    );
}

export default Tabs;