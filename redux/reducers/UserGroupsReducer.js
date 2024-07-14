import { USER_GROUPS } from "../actions/types";

const initialState={
    loading:false,
    users_groups:[],
    error:""
}

const UserGroupsReducer = (state=initialState,action)=>{
    switch (action.type) {
            case USER_GROUPS:
                return{
                    loading:false,
                    users_groups:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default UserGroupsReducer;