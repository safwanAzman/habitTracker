import React from 'react'
import {View} from 'react-native';

export default function container({children}) {
    return (
        <View className="mx-5 my-2 flex-1">
            {children}
        </View>
    )
}
