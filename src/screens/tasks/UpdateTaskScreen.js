import React, {useState,useRef} from 'react'
import { Text, View,Alert} from 'react-native'
import Container from '../../components/container';
import { Formik } from 'formik';
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BtnBack from '../../components/btn/BtnBack';

import Input from '../../components/form/Input';
import Select from '../../components/form/Select';
import Calendar from '../../components/calendar/Calendar';
import Btnsubmit from '../../components/btn/BtnSubmit';
import moment from 'moment';

import EmojiPicker from "rn-emoji-picker"
import {emojis} from "rn-emoji-picker/dist/data";
import RBSheet from "react-native-raw-bottom-sheet";

import { AuthContext } from '../../context/auth/AuthContext';
import { apiUpdateTask } from '../../services/tasks';


export default function UpdateTaskScreen({route,navigation}) {
    const {showData} = route.params;
    const { handlingLoading  } = React.useContext(AuthContext);
    const refRBSheet = useRef();
    const refEmoji = useRef();
    const [startDate, setStartDate] = useState(showData.start_date);
    const [endDate, setEndDate] = useState(showData.end_date);
    const [recent, setRecent] = useState([])
    
    const Schema = Yup.object().shape({
        task_name: Yup.string().required("Email Required"),
        categories: Yup.string().required("Emoji Required"),
        task_level: Yup.string().required("Task Level Required"),
        start_date: Yup.string().required("Date Required"),
    });

    const submit = async (data,actions) => {
        try{
            handlingLoading();
            const result = await apiUpdateTask(data,showData.id);
            if(result.code === 200){
                Alert.alert(
                    "Succsess",
                    result.message,
                    [
                        {
                            text: "OK",
                            onPress: () =>  navigation.navigate('Dashboard'),
                        }
                    ]
                );
            }
            handlingLoading();
        } catch (e) {
            console.log(e)
            handlingLoading();
        }
    };
    
    return (
        <>
        <BtnBack/>
        <Container className="items-center justify-center flex-1">
            <Formik
                validationSchema={Schema}
                initialValues={{ 
                    task_name:showData.task_name,
                    categories:showData.categories,
                    task_level:showData.task_level,
                    start_date:showData.start_date,
                    end_date:showData.end_date,
                }}
                onSubmit={(values,actions)=>{
                    submit(values,actions)
                }}
            >
            {({ handleChange,handleSubmit,values,errors,touched,setFieldValue}) => (
            <>
            <KeyboardAwareScrollView  showsVerticalScrollIndicator={false} bounces={false} >
                <View>
                    <View className="mb-5 space-y-1">
                        <Text className="text-3xl font-bold">Edit Task</Text>
                        <Text className="text-lg text-gray-600">what you achieve today ✍</Text>
                    </View> 
                    <View className="mb-6">
                        <Input
                            label="Name of Task"
                            onChangeText={handleChange("task_name")}
                            value={values.task_name}
                            errorMessage={errors.task_name && touched.task_name ? errors.task_name : null}
                        />
                    </View>
                    <View className="mb-6">
                        <Select 
                            label="Level of Task"
                            value={values.task_level}
                            onValueChange={(value) => setFieldValue("task_level", value)}
                            placeholder={{
                                label: "Select Level",
                            }}
                            items={[
                                { label: "Low", value:'1' },
                                { label: "Medium", value:'2' },
                                { label: "High", value:'3' },
                            ]}
                            useNativeAndroidPickerStyle={false}
                            errorMessage={errors.task_level && touched.task_level ? errors.task_level : null}
                        />
                    </View>
                    <View className="mb-6">
                        <Input
                            editable={false}
                            label="Choose your Emoji"
                            value={recent.length === 0 ? showData.categories : recent[0].emoji}
                            rightIcon="emoji-emotions"
                            onPress={() => refEmoji.current.open()}
                            errorMessage={errors.categories && touched.categories ? errors.categories : null}
                        />
                    </View>
                    <View className="mb-6">
                        <Input
                            editable={false}
                            label="Start Date - End Date"
                            value={`${startDate ? moment(startDate).format('DD/MM/YYYY') : 'DD/MM/YYYY'} - ${endDate ? moment(endDate).format('DD/MM/YYYY')  : 'DD/MM/YYYY'}`}
                            rightIcon="calendar-today"
                            onPress={() => refRBSheet.current.open()}
                            errorMessage={errors.start_date && touched.start_date ? errors.start_date : null}
                        />
                        <Calendar 
                            allowRangeSelection={true}
                            openCalendar={refRBSheet}
                            onChange={(start, end) => {
                                setStartDate(start);
                                setEndDate(end);
                                setFieldValue('start_date', start ? moment(start).format('YYYY/MM/DD') : '');
                                setFieldValue('end_date', end ? moment(end).format('YYYY/MM/DD') : '');
                            }} 
                            startDate={startDate} 
                            endDate={endDate} 
                            resetDate={() => {
                                setStartDate(null),
                                setEndDate(null)
                                setFieldValue('start_date', null);
                                setFieldValue('end_date', null);
                            }}
                        />
                    </View>
                    <View className="mt-6">
                    <Btnsubmit
                        title="Update Task"
                        onPress={handleSubmit}
                    />
                </View>
                </View>
            </KeyboardAwareScrollView>
            <RBSheet
                    ref={refEmoji}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={Platform.OS === "android" ? 380 : 420}
                    openDuration={450}
                    customStyles={{
                        container: {
                            borderTopLeftRadius:18,
                            borderTopRightRadius:18,
                            paddingLeft:12,
                            paddingRight:12,
                        }
                    }}
                >
                <EmojiPicker
                    emojis={emojis} 
                    recent={recent} 
                    autoFocus={false} 
                    loading={false}
                    darkMode={false} 
                    perLine={7} 
                    onSelect={() => refEmoji.current.close()} 
                    onChangeRecent={(newRecent) => {
                        setRecent(newRecent);
                        setFieldValue('categories', newRecent.length === 0 ? '' : newRecent[0].emoji);
                    }} 
                />
            </RBSheet>
            </>
            )}
            </Formik>
        </Container>
        </>
    )
}
