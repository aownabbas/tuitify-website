import { USER_GIISTS } from "../actions/types";

const initialState={
    loading:false,
    users_giists:[],
    error:""
}

const UserGiistsReducer = (state=initialState,action)=>{
    switch (action.type) {
            case USER_GIISTS:
                return{
                    loading:false,
                    users_giists:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default UserGiistsReducer;