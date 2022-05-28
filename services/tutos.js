import axios from "axios";
import { config } from "../config";

const api = config.API_ENDPOINT

export const getTutos = async (type) =>{
    
    const res = await axios.get(`${api}/tutos${type?"?type="+type:""}`)
    if(res.status===200){
        return {
            success : true,
            data : res.data
        }
    }
    else{
        return {
            success : false,
            message : res.statusText
        }
    }
}

export const getTuto = async (id) =>{
    
    const res = await axios.get(`${api}/tutos/${id}`)
    if(res.status===200){
        return {
            success : true,
            data : res.data
        }
    }
    else{
        return {
            success : false,
            message : res.statusText
        }
    }
}

