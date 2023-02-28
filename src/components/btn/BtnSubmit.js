import React from 'react'
import {Pressable,Text} from 'react-native';
import { theme } from '../../theme';

export default function Btnsubmit({title,onPress}) {
    return (
        <Pressable 
            className={`
            ${Platform.OS === "android" ? 'py-3' : 'py-4'}
            flex items-center justify-center rounded-lg
            `}
            style={{backgroundColor:theme.colors.main}}
            onPress={onPress}
            >
            <Text className="font-semibold text-white">{title}</Text>
        </Pressable>
    )
}
