import React from 'react'
import Checkbox from 'expo-checkbox';
import { theme } from '../../theme';
import { Text, View } from 'react-native';

export default function MyCheckbox({value,onValueChange,disabled,label}) {
    return (
        <>
        <View className="flex flex-row items-center space-x-2">
            <Checkbox
                value={value}
                disabled={disabled}
                onValueChange={onValueChange}
                color={value ? theme.colors.main : undefined}
                className="border-gray-400 rounded-md "
            />
            <Text className="text-sm font-semibold">{label}</Text>
        </View>
        </>
    )
}

{/* 
    ## EXAMPLE CALL MYCHECKBOX COMPONENT
    const [isChecked, setChecked] = useState(false);
    <MyCheckbox
        label="Label"
        value={isChecked}
        disabled={true}
        onValueChange={setChecked}
        color={isChecked ? '#4630EB' : undefined}
    /> 
*/}
