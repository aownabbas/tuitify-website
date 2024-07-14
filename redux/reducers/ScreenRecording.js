// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
  screenRecording: "false",
};

// reducer function.
const screenRecordingReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.SCREEN_RECORDING:
      return {
        ...state,
        screenRecording: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default screenRecordingReducer;
