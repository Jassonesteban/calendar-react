import axios from 'axios';
import { getEnvVariables } from '../helpers';

const {VITE_API_URL} = getEnvVariables();


const calendarAPI = axios.create({
    baseURL: VITE_API_URL
});
//Configuracion de interceptores
calendarAPI.interceptors.request.use(config => {
     config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }   
    return config;
})




export default calendarAPI;
