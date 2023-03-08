/*****************************
 * index.js
 ******************************/

import axios, { getData } from '../../helpers/axios';

//get post
export const apiAddTask = async (data) => {
    return axios.post("/tasks", data).then(getData);
};

export const getApiDailyTask = async (data) => {
    return axios.get("/tasks", data).then(getData);
};

export const getApiWeeklyTask = async (data) => {
    return axios.get("/tasksWeek", data).then(getData);
};

export const getApiMonthlyTask = async (data) => {
    return axios.get("/tasksMonth", data).then(getData);
};

export const getApiCompleteTask = async (data) => {
    return axios.get("/tasksComplete", data).then(getData);
};

export const getApiNotCompleteTask = async (data) => {
    return axios.get("/tasksTodo", data).then(getData);
};

export const getApiOverdueTask = async (data) => {
    return axios.get("/tasksOverdue", data).then(getData);
};

export const getApiAllTask = async (data) => {
    return axios.get("/tasksAll", data).then(getData);
};

export const getApiUpdateTaskStatus = async (id) => {
    return axios.get(`/tasks/${id}`).then(getData);
};

export const apiDeleteTask = async (id) =>{
    return axios.delete(`/tasks/${id}`).then(getData);
}

export const apiShowTask = async (id) =>{
    return axios.get(`/taskshow/${id}`).then(getData);
}

export const apiUpdateTask = async (data,id) =>{
    return axios.post(`/tasks/${id}/update`, data).then(getData);
}

export const apiLogout = async (data) => {
    return axios.post("/logout", data).then(getData);
};





