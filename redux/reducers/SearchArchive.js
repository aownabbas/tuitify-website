import { FETCH_SEARCH_ARCHIVE } from "../actions/types";

const initialState={
    loading:false,
    searchArchive:[],
    error:""
}

const reducerSearchArchive=(state=initialState,action)=>{
    switch (action.type) {
            case FETCH_SEARCH_ARCHIVE:
                return{
                    loading:false,
                    searchArchive:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default reducerSearchArchive;