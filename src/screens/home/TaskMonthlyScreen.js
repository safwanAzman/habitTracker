import React, {useState,useCallback} from 'react'
import { Text, View,Pressable,FlatList } from 'react-native';
import BtnBack from '../../components/btn/BtnBack';
import Container from '../../components/container';
import { useFocusEffect } from '@react-navigation/native';
import MyCheckbox from '../../components/form/MyCheckbox';
import RBSheet from "react-native-raw-bottom-sheet";
import { theme } from '../../theme';
import { AuthContext } from '../../context/auth/AuthContext';
import {Entypo} from '@expo/vector-icons';
import Input from '../../components/form/Input'


import { 
    getApiMonthlyTask,
    getApiUpdateTaskStatus,
    apiShowTask
} from '../../services/tasks';



export default function TaskMonthlyScreen({navigation}) {
    const { handlingLoading } = React.useContext(AuthContext);
    const [monthlyData,setMonthlyData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const getMonthlyTask = async (data) => {
        const result = await getApiMonthlyTask(data);
        setMonthlyData(result.tasks);
    }

    const updateStatus = async (id) => {
        handlingLoading();
        const result = await getApiUpdateTaskStatus(id);
        getMonthlyTask();
        handlingLoading();
    }

    const showTask = async (id) => {
        const result = await apiShowTask(id);
        navigation.navigate('UpdateTask',{showData:result.tasks})
        this[RBSheet + id].close()
    }

    const filteredData = monthlyData.filter(task => {
        return task.task_name.toLowerCase().includes(searchQuery.toLowerCase());
    });    
    
    useFocusEffect(
        useCallback(() => {
            getMonthlyTask();
        }, [])
    );

    return (
        <>
            <BtnBack/>
            <Container>
                <View className="mb-1 space-y-1">
                    <Text className="text-3xl font-bold">Monthly Task</Text>
                    <Text className="text-lg text-gray-600 ">Complete Your Monthly Task⚡</Text>
                </View>
                <View className="mb-4">
                    <Input
                        placeholder="Search"
                        leftIcon="search"
                        onChangeText={text => setSearchQuery(text)}
                        value={searchQuery}
                    />
                </View>
                <FlatList
                keyExtractor={(item,index) => index.toString()}
                onEndReachedThreshold={0.5}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={false}
                data={filteredData}
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
                                                        this[RBSheet + item.item.id].close(),
                                                        deleteTask(item.item.id)
                                                    },
                                                },
                                                {
                                                    text: 'Cancel',
                                                    onPress: () =>  this[RBSheet + item.item.id].close(),
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
        </>
    )
}
