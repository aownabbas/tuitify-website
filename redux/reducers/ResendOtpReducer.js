// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    resend_otp: '',
};

// reducer function.
const resendOtpReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.RESEND_OTP:
      return {
        ...state,
        resend_otp: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default resendOtpReducer;
