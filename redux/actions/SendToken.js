import { SEND_TOKEN } from "./types"

export const fetchstatisticsToken=(token)=>{
    console.log(token, "on action");
    return{
        type:SEND_TOKEN,
        payload:token
    }
    }

const sendToken=(params)=>{
    return(dispatch)=>{
        console.log(params, "before action")
        dispatch(fetchstatisticsToken(params))
    }
}

export default sendToken