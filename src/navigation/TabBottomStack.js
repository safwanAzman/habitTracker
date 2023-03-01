import * as React from "react";
import { StyleSheet, Pressable, View } from 'react-native';
import {FontAwesome,MaterialCommunityIcons,Ionicons,AntDesign} from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import TestScreen from "../screens/test/TestScreen";
import TaskScreen from "../screens/tasks/TaskScreen";
import SettingScreen from "../screens/settings/SettingScreen";
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
                <Ionicons  name="pie-chart-outline" size={35} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "",
        }}
    />

    <BottomNavigator.Screen 
        name="AddTask" 
        component={TaskScreen} 
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="chart-box-plus-outline" size={35} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "",
        }}
    />

    <BottomNavigator.Screen 
        name="Setting" 
        component={SettingScreen} 
        options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <Ionicons name="settings-outline" size={35} color={focused ? theme.colors.activeTintColor: theme.colors.inactiveColor} />
            ),
            tabBarLabel: "",
        }}
    />

    </BottomNavigator.Navigator>
);

const styles = StyleSheet.create({
    tabContainer:{
        backgroundColor: Platform.OS === "android" ? theme.colors.default : theme.colors.botomTab,
        padding:8,
        height:70,
        paddingBottom:2
    },
    tabLabel:{
        fontSize:12,
    }
})