import { KH_FAVOURITE_GIISTS } from "../actions/types";

const initialState={
    loading:false,
    favourite_giist:[],
    error:""
}

const Kh_FavouriteGiistReducer = (state=initialState,action)=>{
    switch (action.type) {
            case KH_FAVOURITE_GIISTS:
                return{
                    loading:false,
                    favourite_giist:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default Kh_FavouriteGiistReducer;