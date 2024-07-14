import { KH_LATEST_GIISTS } from "../actions/types";

const initialState={
    loading:false,
    latest_giists:[],
    error:""
}

const Kh_LatestGiistsReducer = (state=initialState,action)=>{
    switch (action.type) {
            case KH_LATEST_GIISTS:
                return{
                    loading:false,
                    latest_giists:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default Kh_LatestGiistsReducer;