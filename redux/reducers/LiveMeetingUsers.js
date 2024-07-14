// import * as types from "../actions/types";

// const intialState = {
//     id: null,
//     first_name: null,
//     last_name: null,
//     image: null, 
// }

// const LiveMeetingUsers = (state = intialState, action) => {
//     switch (types.action) {
//         case types.LIVE_USERS:
//         return {
//             ...state,
//             data: action.payload.res,
//         };
//         default:
//         return state;
//     }
// }


// export default LiveMeetingUsers;

import React from "react";
import { LIVE_USERS } from "../actions/types";

const initialState={
    loading:false,
    get_allusers:[],
    error:""
}

const LiveMeetingUsers=(state=initialState,action)=>{
    switch (action.type) {
            case LIVE_USERS:
                return{
                    loading:false,
                    get_allusers:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default LiveMeetingUsers;