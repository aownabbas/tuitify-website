import React from "react";
import { FETCH_ACTIVE_USERS, FETCH_ACTIVE_USERS_LOADING } from "../actions/types";

const initialState={
    loading:false,
    users:[],
    error:""
}
const ActiveUsers = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_ACTIVE_USERS_LOADING:
            return {
                ...state,
                loading: true,
            }

        case FETCH_ACTIVE_USERS:
            return {
                ...state,
                users: action.payload,

                loading: false,
            }

        default:
            return { ...state }
    }
}
export default ActiveUsers;