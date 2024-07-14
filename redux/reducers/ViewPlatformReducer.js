// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    view_platform: '',
};

// reducer function.
const ViewPlatformReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.VIEW_PLATFORM:
      return {
        ...state,
        view_platform: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default ViewPlatformReducer;
