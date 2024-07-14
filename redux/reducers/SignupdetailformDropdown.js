import { SIGNUP_DROP } from "../actions/types";

const initialState = {
    loading:false,
    get_salutation:[],
    error:""
}


const SignupdetailformDropdown=(state=initialState, action)=>{
    switch (action.type) {
            case SIGNUP_DROP:
                return{
                    loading:false,
                    get_salutation:action.payload,
                    error:""
                }
            break;
        default:
            return state
    }
}
export default SignupdetailformDropdown;