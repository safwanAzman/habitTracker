import React from 'react'
import {Pressable,Text,View} from 'react-native';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';

export default function BtnBack() {
    const navigation = useNavigation();
    return (
        <Pressable 
            className={`
            ${Platform.OS === "android" ? 'py-1' : 'py-2'}
            flex-row items-center justify-center w-20 
            `}
            onPress={() => navigation.goBack()}  
            >
            <View className="flex-row items-center">
                <MaterialIcons  name="arrow-back-ios" size={20}/>
                <Text className="text-sm ">Back</Text>
            </View>
        </Pressable>
    )
}
