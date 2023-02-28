import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';



//Route for auth stack before authenticated
const AuthStack = createNativeStackNavigator();
export const AuthStackNavigator = () => (
    <AuthStack.Navigator 
        initialRouteName="Login"
    >

        <AuthStack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
        />

        <AuthStack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }}
        />

        <AuthStack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen} 
            options={{ headerShown: false }}
        />
        
    </AuthStack.Navigator>
);