import * as React from "react";
import { StyleSheet, Pressable, View } from 'react-native';
import {FontAwesome,MaterialCommunityIcons,Ionicons,} from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import TestScreen from "../screens/test/TestScreen";
import { theme } from "../theme/index";

// Route for bottom navigator
const BottomNavigator = createBottomTabNavigator();
export const TabBottomStack = () => (
    <BottomNavigator.Navigator
        screenOptions={{
            tabBarStyle:styles.tabContainer,
            tabBarLabelStyle:styles.tabLabel ,
            tabBarActiveTintColor:theme.colors.activeTintColor,
            tabBarInactiveTintColor:theme.colors.inactiveColor,
            safeAreaInset: { bottom: 'never', top: 'never' }
            
        }}
        
    >
    <BottomNavigator.Screen 
        name="Dashboard" 
        component={HomeScreen} 
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <FontAwesome  name="home" size={30} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "Home",
        }}
    />

    <BottomNavigator.Screen 
        name="test1" 
        component={TestScreen} 
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <Ionicons name="md-receipt-sharp" size={30} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "test1",
        }}
    />

    <BottomNavigator.Screen 
        name="test2" 
        component={TestScreen} 
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="shopping" size={30} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "test2",
        }}
    />

    <BottomNavigator.Screen 
        name="test3" 
        component={TestScreen} 
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <FontAwesome name="user-circle" size={30} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "test3",
        }}
    />

    </BottomNavigator.Navigator>
);

const styles = StyleSheet.create({
    tabContainer:{
        backgroundColor: Platform.OS === "android" ? theme.colors.default : theme.colors.botomTab,
        padding:8,
        height:70,
        paddingBottom:10
    },
    tabLabel:{
        fontSize:12,
    }
})