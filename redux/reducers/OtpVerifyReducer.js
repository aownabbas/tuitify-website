// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    otp_verify: '',
};

// reducer function.
const otpVerifyReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.OTP_VERIFY:
      return {
        ...state,
        otp_verify: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default otpVerifyReducer;
