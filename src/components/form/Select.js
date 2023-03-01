import React, { useState } from 'react';
import {Text} from 'react-native';
import { theme } from '../../theme';

import RNPickerSelect from "react-native-picker-select";

export default function Select({ errorMessage, label, onValueChange, items, placeholder, value}) {

    return (
    <>
        <Text className={`text-sm font-semibold  pl-1 ${errorMessage ? 'text-red-500 ' : 'text-gray-900'}`}>
            {label}
        </Text>
        <RNPickerSelect
        style={{
        placeholder: {
            fontSize: 12,
            color: "#9e9e9e",
        },
        inputIOS: {
            fontSize: 12,
            borderWidth: 1,
            borderColor:  errorMessage ? '#ef4444' : '#cbd5e1',
            borderRadius: 6,
            padding: 17,
            backgroundColor: theme.colors.white,
            color: theme.colors.black,
            },
            inputAndroid: {
            fontSize: 12,
            borderWidth: 1,
            borderColor:  errorMessage ? '#ef4444' : '#cbd5e1',
            borderRadius: 10,
            paddingVertical: 9,
            paddingHorizontal: 20,
            backgroundColor: "white",
            color: theme.colors.black,
            }
        }}
        key={true}
        value={value}
        useNativeAndroidPickerStyle={false}
        onValueChange={onValueChange}
        items={items}
        placeholder={placeholder}
    />
        <Text className={`text-sm font-semibold pl-1 text-red-500 pt-1 ${errorMessage ? 'block' : 'hidden'}`}>
        {errorMessage}
        </Text>
    </>
    );
} 

{/* 
## EXAMPLE CALL SELECT COMPONENT
    <>
        <Select 
            label=""
            placeholder="select" 
            errorMessage={errors.selectData && touched.selectData ? errors.selectData : null}
            options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ]} 
            passSetValue={selectData}
            onChangeValue={(value) => setFieldValue('selectData', value)}
            zIndex={3000}
            zIndexInverse={1000}
        />
    </>
    <>
        <Select 
            label=""
            label=""
            placeholder="select" 
            errorMessage={errors.selectData && touched.selectData ? errors.selectData : null}
            options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ]} 
            passSetValue={selectData}
            onChangeValue={(value) => setFieldValue('selectData', value)}
            zIndex={2000}
            zIndexInverse={2000}
        /> 
    </>
*/}
