import React from "react";
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loading = () => {
return (
    <View className="bg-black opacity-50 flex-1" style={styles.animationContainer}>
        <ActivityIndicator />
    </View>
);
};

const styles = StyleSheet.create({
    animationContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.9,
        justifyContent: "center",
        alignItems: "center",
    }
    });

export default Loading;
