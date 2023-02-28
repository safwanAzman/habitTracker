import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";
import { endpoint } from '../../environment';

const API_BASE_URL = endpoint;

const request = axios.create({
baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
        const { status } = error.response;
        if ( status === 500) {
            Alert.alert(
            "Unexpected error occured!"
            );
        }
        return Promise.reject(error.response);
        }
    }
);

export function getData(response) {
    return response.data;
}

export default request;
