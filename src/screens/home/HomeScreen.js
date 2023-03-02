import React, {useState,useCallback,useRef} from 'react';
import { Text, View,Pressable,FlatList,Alert } from 'react-native';
import Container from '../../components/container';
import { useFocusEffect } from '@react-navigation/native';
import MyCheckbox from '../../components/form/MyCheckbox';
import {Entypo} from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { theme } from '../../theme';

import { 
    getApiDailyTask,
    getApiWeeklyTask,
    getApiMonthlyTask,
    getApiCompleteTask ,
    getApiUpdateTaskStatus,
    getApiNotCompleteTask,
    getApiAllTask,
    getApiOverdueTask,
    apiDeleteTask,
    apiShowTask
} from '../../services/tasks';
import { AuthContext } from '../../context/auth/AuthContext';


export default function HomeScreen({navigation}) {
    const { handlingLoading } = React.useContext(AuthContext);
    const refRBSheet = useRef();
    const [allData,setAllData] = useState([]);
    const [dailyData,setDailyData] = useState([]);
    const [weeklyData,setWeeklyData] = useState([]);
    const [monthData,setMonthData] = useState([]);
    const [completeData,setCompleteData] = useState([]);
    const [noCompleteData,setNoCompleteData] = useState([]);
    const [overDueData,setOverDueData] = useState([]);

    const getAllTask = async (data) => {
        const result = await getApiAllTask(data);
        setAllData(result.tasks);
    }
    
    const getdailyTask = async (data) => {
        const result = await getApiDailyTask(data);
        setDailyData(result.tasks);
    }
    const getWeeklyTask = async (data) => {
        const result = await getApiWeeklyTask(data);
        setWeeklyData(result.tasks);
    }
    const getMonthlyTask = async (data) => {
        const result = await getApiMonthlyTask(data);
        setMonthData(result.tasks);
    }

    const getCompleteTask = async (data) => {
        const result = await getApiCompleteTask(data);
        setCompleteData(result.tasks);
    }

    const getNoCompleteTask = async (data) => {
        const result = await getApiNotCompleteTask(data);
        setNoCompleteData(result.tasks);
    }

    const getOverDueTask = async (data) => {
        const result = await getApiOverdueTask(data);
        setOverDueData(result.tasks);
    }
    
    const updateStatus = async (id) => {
        handlingLoading();
        const result = await getApiUpdateTaskStatus(id);
        getdailyTask();
        getWeeklyTask();
        getMonthlyTask();
        getCompleteTask();
        getNoCompleteTask();
        getOverDueTask();
        getAllTask();
        handlingLoading();
    }

    const deleteTask = async (id) => {
        const result = await apiDeleteTask(id);
        getdailyTask();
        getWeeklyTask();
        getMonthlyTask();
        getCompleteTask();
        getNoCompleteTask();
        getOverDueTask();
        getAllTask();
    }

    const showTask = async (id) => {
        const result = await apiShowTask(id);
        navigation.navigate('UpdateTask',{showData:result.tasks})
        this[RBSheet + id].close()
    }

    useFocusEffect(
        useCallback(() => {
            getdailyTask();
            getWeeklyTask();
            getMonthlyTask();
            getCompleteTask();
            getNoCompleteTask();
            getOverDueTask();
            getAllTask();
        }, [])
    );

    return (
        <Container>
            <View>
                <View className="mb-5 space-y-1">
                    <Text className="text-3xl font-bold">Enjoy Your Work</Text>
                    <Text className="text-lg text-gray-600 ">and always productive 🙌</Text>
                </View> 
                <View className="flex-row ">
                    <Pressable onPress={()=> navigation.navigate('TaskDaily')} className="p-4 w-[49%] mr-2 mb-4 rounded-lg bg-pink-400 h-32 shadow-sm shadow-pink-600 flex flex-col  justify-center">
                        <View className="flex flex-row items-center mb-2 spce-x-2">
                            <Text className="text-xl font-bold text-white ">
                                Daily 💡
                            </Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-white">
                            {dailyData.length}
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=> navigation.navigate('TaskWeekly')} className="p-4 w-[49%] mr-2 mb-4 rounded-lg bg-yellow-400 h-32 shadow-sm shadow-yellow-600 flex flex-col justify-center">
                        <View className="flex flex-row mb-2 spce-x-2">
                            <Text className="text-xl font-bold text-white ">
                                Weekly 🔌
                            </Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-white">
                            {weeklyData.length}
                        </Text>
                    </Pressable>
                </View>
                <View className="flex-row ">
                    <Pressable onPress={()=> navigation.navigate('TaskMonthly')} className="p-4 w-[49%] mr-2 mb-4 rounded-lg bg-indigo-400 h-32 shadow-sm shadow-indigo-600 flex flex-col justify-center">
                        <View className="flex flex-row mb-2 spce-x-2">
                            <Text className="text-xl font-bold text-white ">
                                Monthly ⚡
                            </Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-white">
                            {monthData.length}
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=> navigation.navigate('TaskOverDue')} className="p-4  w-[49%] mr-2 mb-4 rounded-lg bg-red-400 h-32  shadow-sm shadow-red-600 flex flex-col justify-center">
                        <View className="flex flex-row mb-2 spce-x-2">
                            <Text className="text-xl font-bold text-white ">
                                Overdue ☠
                            </Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-white">
                            {overDueData.length}
                        </Text>
                    </Pressable>
                </View>
                <View className="flex-row ">
                    <Pressable onPress={()=> navigation.navigate('TaskInComplete')} className="p-4 w-[49%] mr-2 mb-4 rounded-lg bg-stone-400 h-32 shadow-sm shadow-stone-600 flex flex-col justify-center">
                        <View className="flex flex-row mb-2 spce-x-2">
                            <Text className="text-xl font-bold text-white ">
                                inComplete 😥
                            </Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-white">
                            {noCompleteData.length}
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=> navigation.navigate('TaskComplete')} className="p-4  w-[49%] mr-2 mb-4 rounded-lg bg-emerald-400 h-32  shadow-sm shadow-emerald-600 flex flex-col justify-center">
                        <View className="flex flex-row mb-2 spce-x-2">
                            <Text className="text-xl font-bold text-white ">
                                Completed 😊
                            </Text>
                        </View>
                        <Text className="text-3xl font-extrabold text-white">
                            {completeData.length}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className="flex-row items-center justify-between py-4">
                <Text className="text-lg font-semibold">Complete Your Task 💪</Text>
                <Pressable onPress={()=> navigation.navigate('TaskAll')}>
                    <Text className="text-sm font-semibold">See All</Text>
                </Pressable>
            </View>
            <FlatList
                keyExtractor={(item,index) => index.toString()}
                onEndReachedThreshold={0.5}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={false}
                data={allData}
                renderItem={(item) =>{
                    return(
                        <View className="relative flex-row pb-4">
                            <Pressable
                                onPress={()=>updateStatus(item.item.id)}
                                className={`w-full p-4  border  rounded-lg shadow-sm ${item.item.status == 'complete' ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-gray-300'}` }>
                                <View className="flex-row items-center w-full ">
                                    <View className="w-[10%]">
                                        <MyCheckbox
                                            value={item.item.status == 'complete' ? true : false}
                                        /> 
                                    </View>
                                    <View className="flex items-center w-[15%] p-2 bg-gray-100 rounded-lg">
                                        <Text className="text-2xl">{item.item.categories}</Text>
                                    </View>
                                    <View className="pl-3 w-[75%] ">
                                        <View>
                                            <Text numberOfLines={1} className="w-[80%] text-sm font-bold">{item.item.task_name}</Text>
                                            <View className="flex-row justify-between w-full pt-1 ">
                                                {item.item.task_level == 1 ?
                                                <Text className="text-xs font-semibold text-green-500">
                                                    Low Level
                                                </Text>
                                                :item.item.task_level == 2 ?
                                                <Text className="text-xs font-semibold text-yellow-400">
                                                    Medium Level
                                                </Text>
                                                :
                                                <Text className="text-xs font-semibold text-red-500">
                                                    High Level
                                                </Text>
                                                }
                                                <Text className="text-xs font-semibold">{item.item.status == 'complete' ? 'Complete' : item.item.expired}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                            <View className="absolute right-0 px-3 py-2">
                                <Pressable 
                                    onPress={() => this[RBSheet + item.item.id].open()}
                                    className="p-1 rounded-full" style={{backgroundColor:theme.colors.main}}>
                                    <Entypo  name="dots-three-horizontal" size={15} color="white"/>
                                </Pressable>
                            </View>
                            <RBSheet
                                ref={ref => {
                                    this[RBSheet + item.item.id] = ref;
                                }}     
                                closeOnDragDown={true}
                                closeOnPressMask={true}
                                height={200}
                                openDuration={450}
                                customStyles={{
                                    container: {
                                        borderTopLeftRadius:18,
                                        borderTopRightRadius:18,
                                        justifyContent:'center'
                                    },
                                    draggableIcon: {
                                        top:-25
                                    }
                                }}
                            >
                                <View className="px-4 ">
                                    <Pressable 
                                        onPress={()=>showTask(item.item.id)}
                                        className="items-center justify-center p-3 mb-2 bg-black rounded-lg">
                                        <Text className="text-lg text-white">Edit</Text>
                                    </Pressable>
                                    <Pressable 
                                        onPress={() =>{
                                            Alert.alert(
                                                "Are you sure?",
                                                " Do you really want to delete your tasks? this process cannot be undone",
                                                [
                                                    {
                                                        text: "OK",
                                                        onPress: () =>  {
                                                            this[RBSheet + item.item.id].close()
                                                            deleteTask(item.item.id)
                                                        },
                                                    },
                                                    {
                                                        text: 'Cancel',
                                                        onPress: () => this[RBSheet + item.item.id].close(),
                                                        style: 'cancel',
                                                    },
                                                ]
                                            );
                                
                                        }                                            
                                        }
                                        className="items-center justify-center p-3 bg-red-500 rounded-lg">
                                        <Text className="text-lg text-white">Delete</Text>
                                    </Pressable>
                                </View>
                            </RBSheet>
                        </View>
                    )
                }}
            />
        </Container>
    );
}

