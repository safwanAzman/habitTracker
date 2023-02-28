import React , { useReducer,useMemo }from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,TextInput, StyleSheet, SafeAreaView, } from 'react-native';
import { NavigationContainer , DefaultTheme } from '@react-navigation/native';
import { AuthContext , authReducer } from './src/context/auth/AuthContext';
import { AuthStackNavigator } from "./src/navigation/AuthStack";
import { HomeStackStackNavigator } from "./src/navigation/HomeStack";
import Loading from './src/components/loading/Loading';


Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {

  const [auth, dispatch] = useReducer(
    authReducer,
    {
      isLoading: false,
      isSignout: false,
      userToken: false,
    }
  );
  
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN',  token: data});
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
      dispatch({ type: 'SIGN_IN', token: data });
      },
      // handling global loading
      handlingLoading: () => dispatch({ type: "SET_LOADING" }),
    }),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
          <StatusBar style="true" />
          <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={CustomTheme} >
              { auth.userToken ?  <HomeStackStackNavigator /> : <AuthStackNavigator />}
              {/* <HomeStackStackNavigator /> */}
            </NavigationContainer>
          </AuthContext.Provider>
          { auth.isLoading ? <Loading /> : null }
      <View style={styles.fixBackground} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  fixBackground: {
    backgroundColor: Platform.OS === "android" ? 'white' : 'black',
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: Platform.OS === "android" ? 10 : 100,
    zIndex: -100,
  },
});

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

