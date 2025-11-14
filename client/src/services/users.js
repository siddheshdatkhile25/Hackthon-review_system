import { config } from "./config";
import axios from 'axios'


export async function login(email,password) {
    try{
        const url = `${config.server}/users/login`

        const body = { email,password }

        const response = await axios.post(url,body)
        console.log(response.data);


        return response.data

    }catch(ex){
        console.log(`exception` , ex);
    }

}

export async function register(firstName, lastName, email, password, mobile, birth) {
    try{
        const url = `${config.server}/users/register`

        const body = { firstName, lastName, email, password, mobile, birth }

        const response = await axios.post(url,body)
        console.log(response.data);


        return response.data

    }catch(ex){
        console.log(`exception` , ex);
    }

}

export async function changePassword(email, oldPassword, newPassword) {
    try{
        const url = `${config.server}/users/change-password`

        const body = { email, oldPassword, newPassword }

        const response = await axios.put(url, body)
        console.log(response.data);

        return response.data

    }catch(ex){
        console.log(`exception` , ex);
    }

}

