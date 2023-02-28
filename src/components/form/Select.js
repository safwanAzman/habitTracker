import React, { useState } from 'react';
import {Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Select({ errorMessage, placeholder, label, options,zIndex,zIndexInverse,onChangeValue,onSelectItem ,passSetValue}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(passSetValue);
    const [items, setItems] = useState(options);

    const handleValueChange = (itemValue) => {
        setValue(itemValue);
        onChangeValue && onChangeValue(itemValue);
    };

    return (
    <>
        <Text className={`text-sm font-semibold  pl-1 ${errorMessage ? 'text-red-500 ' : 'text-gray-900'}`}>
            {label}
        </Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={handleValueChange}
            onSelectItem={onSelectItem}
            setItems={setItems}
            style={{
                borderColor: errorMessage ? '#ef4444' : '#cbd5e1'
            }}
            dropDownContainerStyle={{
                borderColor: errorMessage ? '#ef4444' : '#cbd5e1'
            }}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
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
