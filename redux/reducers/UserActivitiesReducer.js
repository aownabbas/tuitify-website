import { USER_ACTIVITIES } from "../actions/types";

const initialState={
    loading:false,
    users_activities:[],
    error:""
}

const UserActivitiesReducer = (state=initialState,action)=>{
    switch (action.type) {
            case USER_ACTIVITIES:
                return{
                    loading:false,
                    users_activities:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default UserActivitiesReducer;