import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {TabBottomStack} from "./TabBottomStack";
import { theme } from "../theme/index";
import { apiLogout } from '../services/auth';
import { AuthContext } from '../context/auth/AuthContext';
import * as SecureStore from 'expo-secure-store';



// Route for home stack 
const HomeStack = createNativeStackNavigator();

export const HomeStackStackNavigator = () => (
    <>
        <HomeStack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown:false,
                headerStyle:{
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
                }
            }}
        >
            <HomeStack.Screen name="Home" component={TabBottomStack} />
        </HomeStack.Navigator>
    </>
);
