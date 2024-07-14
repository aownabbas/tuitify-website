import { KH_FOLLOWED_USER_GIISTS } from "../actions/types";

const initialState={
    loading:false,
    followed_user_giists:[],
    error:""
}

const Kh_followedGiistsReducer = (state=initialState,action)=>{
    switch (action.type) {
            case KH_FOLLOWED_USER_GIISTS:
                return{
                    loading:false,
                    followed_user_giists:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default Kh_followedGiistsReducer;