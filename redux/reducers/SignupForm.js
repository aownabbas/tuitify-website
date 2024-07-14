// signup reducer
import React from "react";
import * as types from "../actions/types";

const initialState={
    loading:false,
    post_formData:{},
    error:"",
    
    
}

const SignupForm=(state=initialState, action)=>{
    switch (action.type) {
            case types.SIGNUP_FORM:
                return{
                    loading:false,
                    post_formData:action.payload,
                    error:"",
                }
            break;
        default:
            return state
    }
}
export default SignupForm;