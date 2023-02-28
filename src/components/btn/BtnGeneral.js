import React from 'react'
import {Pressable,Text} from 'react-native';
import { theme } from '../../theme';

export default function BtnGeneral({title,onPress,styleBtn,styleTextBtn}) {
    const stylingBtn = styleBtn;
    const stylingBtnText = styleTextBtn;
    return (
        <Pressable 
            className={`
            ${Platform.OS === "android" ? 'py-3' : 'py-4'}
            flex items-center justify-center rounded-lg
            ${stylingBtn}
            `}
            onPress={onPress}
            >
            <Text className={`font-semibold ${stylingBtnText}`}>{title}</Text>
        </Pressable>
    )
}
