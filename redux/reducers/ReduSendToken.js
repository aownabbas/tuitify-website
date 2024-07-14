import { SEND_TOKEN } from "../actions/types";

const initialState={
    loading:false,
    token:"",
    error:""
}

const ReduSendToken=(state=initialState,action)=>{
    switch (action.type) {
            case SEND_TOKEN:
      console.log(action.payload, "after action");
                return{
                    loading:false,
                    token:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default ReduSendToken;