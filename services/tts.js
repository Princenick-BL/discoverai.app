import axios from "axios";
import { config } from "../config";

const api = config.API_ENDPOINT

export const getVoices = async () =>{
    
    const res = await axios.get(`${api}/tts/voices`)
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

export const generateTTS = async (text,voice) =>{
    
    const res = await axios.post(`${api}/tts/generate`,{
        text:text,
        voice:voice
    })

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
