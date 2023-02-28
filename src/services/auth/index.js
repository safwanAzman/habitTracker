/*****************************
 * index.js
 ******************************/

import axios, { getData } from '../../helpers/axios';

//get post
export const apiLogin = async (data) => {
    return axios.post("/login", data).then(getData);
};

export const apiRegister = async (data) => {
    return axios.post("/register", data).then(getData);
};

export const apiLogout = async (data) => {
    return axios.post("/logout", data).then(getData);
};



