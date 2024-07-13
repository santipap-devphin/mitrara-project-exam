import axios from "axios";
const BASE_URL = "https://dolphin-app-6asm7.ondigitalocean.app";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate =  axios.create({
    baseURL: BASE_URL , 
    headers:{'Content-Type': 'application/json'},
    withCredentials:true
})