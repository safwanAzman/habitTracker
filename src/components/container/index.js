import React from 'react'
import {View} from 'react-native';

export default function container({children}) {
    return (
        <View className="flex-1 mx-5 my-2">
            {children}
        </View>
    )
}
