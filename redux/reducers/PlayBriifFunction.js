// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    playBriifFunction: null,
};

// reducer function.
const playBriifFunctionReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.PLAY_BRIIF_FUNCTION:
      return {
        ...state,
        playBriifFunction: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default playBriifFunctionReducer;
