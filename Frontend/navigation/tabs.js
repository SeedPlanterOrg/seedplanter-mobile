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
            width: 75,
            height: 75,
            borderRadius: 50,
            backgroundColor: '#68b454',
            shadowColor: '#333',
            shadowOpacity: 0.4,
            shadowOffset: { width: 1, height: 1 },

        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return(
        <Tab.Navigator 
            screenOptions={{ 
                tabBarShowLabel: false,
                tabBarStyle: {
                    flex: 1,
                    position: 'absolute',
                    height: 70,
                    borderRadius: 50,
                    bottom: 10,
                    elevation: 0,
                    right: 10,
                    left: 10,
                    paddingBottom: 0,
                    shadowColor: '#333',
                    shadowOpacity: 0.4,
                    shadowOffset: { width: 1, height: 1 },
                }
            }}>
            <Tab.Screen name="My Garden" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/home3.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#68b454' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

            <Tab.Screen name="Journal" component={JournalScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/book6.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#68b454' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

            <Tab.Screen name="Plantbot" component={ChatBotScreen} options={{
                tabBarIcon: ({focused}) => (
                    <Image source={require('../assets/chat6.png')}
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
                        <Image source={require('../assets/search6.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#68b454' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

            <Tab.Screen name="My Profile" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={require('../assets/profile6.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#68b454' : '#000000'
                            }}
                        />
                    </View>
                ),
            }}/>

        </Tab.Navigator>
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
    }
});