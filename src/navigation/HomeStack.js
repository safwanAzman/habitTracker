import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {TabBottomStack} from "./TabBottomStack";
import TaskAllScreen from "../screens/home/TaskAllScreen";
import TaskDailyScreen from "../screens/home/TaskDailyScreen";
import TaskWeeklyScreen from "../screens/home/TaskWeeklyScreen";
import TaskMonthlyScreen from "../screens/home/TaskMonthlyScreen";
import TaskInCompleteScreen from "../screens/home/TaskInCompleteScreen";
import TaskOverdueScreen from "../screens/home/TaskOverdueScreen";
import TaskCompleteScreen from "../screens/home/TaskCompleteScreen";
import UpdateTaskScreen from "../screens/tasks/UpdateTaskScreen";



// Route for home stack 
const HomeStack = createNativeStackNavigator();

export const HomeStackStackNavigator = () => (
    <>
        <HomeStack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown:false,
                headerStyle:{
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
                }
            }}
        >
            <HomeStack.Screen name="Home" component={TabBottomStack} />
            <HomeStack.Screen name="TaskAll" component={TaskAllScreen} />
            <HomeStack.Screen name="TaskDaily" component={TaskDailyScreen} />
            <HomeStack.Screen name="TaskWeekly" component={TaskWeeklyScreen} />
            <HomeStack.Screen name="TaskMonthly" component={TaskMonthlyScreen} />
            <HomeStack.Screen name="TaskInComplete" component={TaskInCompleteScreen} />
            <HomeStack.Screen name="TaskOverDue" component={TaskOverdueScreen} />
            <HomeStack.Screen name="TaskComplete" component={TaskCompleteScreen} />

            <HomeStack.Screen name="UpdateTask" component={UpdateTaskScreen} />
        </HomeStack.Navigator>
        
    </>
);
