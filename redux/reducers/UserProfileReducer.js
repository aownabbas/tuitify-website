import { MYPROFILE_USERS } from "../actions/types";

const initialState={
    loading:false,
    all_profileUsers:[],
    error:""
}

const UserProfileReducer = (state=initialState,action)=>{
    switch (action.type) {
            case MYPROFILE_USERS:
                return{
                    loading:false,
                    all_profileUsers:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default UserProfileReducer;