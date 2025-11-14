import { config } from "./config";
import axios from 'axios'


export async function login(email,password) {
    try{
        const url = `${config.server}/users/login`

        const body = {email,password}

        const response = await axios.post(url,body)

        return response.data

    }catch(ex){
        console.log(`exception` , ex);
        

    }
    
}

