import React from "react";
import { FETCH_SEARCH_SEND } from "../actions/types";

const initialState={
    loading:false,
    searchSend:[],
    error:""
}

const reducerSearchSend=(state=initialState,action)=>{
    switch (action.type) {
            case FETCH_SEARCH_SEND:
                return{
                    loading:false,
                    searchSend:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default reducerSearchSend;