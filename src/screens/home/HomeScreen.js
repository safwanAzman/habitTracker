import React, {useState,useRef} from 'react';
import { Text, View,Pressable } from 'react-native';
import Container from '../../components/container';
import { Formik } from 'formik';
import * as Yup from "yup";
import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import MyCheckbox from '../../components/form/MyCheckbox';
import moment from 'moment';
import Btnsubmit from '../../components/btn/BtnSubmit';
import Calendar from '../../components/calendar/Calendar';
import DropDownPicker from 'react-native-dropdown-picker';




export default function HomeScreen({navigation}) {
    const refRBSheet = useRef();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectData, setSelectData] = useState('option2');
    

    const Schema = Yup.object().shape({
        startDate: Yup.string().required("Please Choose Date"),
        selectData: Yup.string().required("Please Choose Date"),
    });

    return (
        <Container>
            <Formik
                // validationSchema={Schema}
                initialValues={{ 
                    startDate:'',
                    endDate:'',
                    selectData:selectData
                }}
                onSubmit={(values,actions)=>{
                    console.log(selectData);
                }}
            >
            {({ handleChange,handleSubmit,values,errors,touched,setFieldValue}) => (
            <>
                <View className="my-3">
                    <>
                        <View 
                            className="mb-0">
                            <Input
                                value={`${startDate ? moment(startDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'} - ${endDate ? moment(endDate).format('DD/MM/YYYY')  : 'DD/MM/YYYY'}`}
                                editable={false}
                                rightIcon="calendar-today"
                                onPress={() => refRBSheet.current.open()}
                                errorMessage={errors.startDate && touched.startDate ? errors.startDate : null}
                            />
                        </View>
                        <Calendar 
                            allowRangeSelection={true}
                            openCalendar={refRBSheet}
                            onChange={(start, end) => {
                                setStartDate(start);
                                setEndDate(end);
                                setFieldValue('startDate', start ? moment(start).format('YYYY/MM/DD') : '');
                                setFieldValue('endDate', end ? moment(end).format('YYYY/MM/DD') : '');
                            }} 
                            startDate={startDate} 
                            endDate={endDate} 
                            resetDate={() => {
                                setStartDate(null),
                                setEndDate(null)
                                setFieldValue('startDate', null);
                                setFieldValue('endDate', null);
                            }}
                        />

                    </>
                </View>
                <>
                    <Select 
                        label=""
                        placeholder="select" 
                        errorMessage={errors.selectData && touched.selectData ? errors.selectData : null}
                        options={[
                            { id: 1 ,label: 'Option 1', value: 'option1' },
                            { id: 2 ,label: 'Option 2', value: 'option2' },
                            { id: 3 ,label: 'Option 3', value: 'option3' },
                        ]} 
                        passSetValue={selectData}
                        onChangeValue={(value) => setFieldValue('selectData', value)}
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </>

                <View className="mt-4">
                    <Input
                        value={'test'}
                        editable={false}
                        secureTextEntry={true}
                        showPass={true}
                        errorMessage={''}
                    />
                </View>
                <View className="mt-6">
                    <Btnsubmit
                        title="Submit"
                        onPress={handleSubmit}
                    />
                </View>
            </>
            )}
            </Formik>
        </Container>
    );
}

