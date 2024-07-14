// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    view_platform_user: '',
};

// reducer function.
const ViewPlatformUserReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.VIEW_PLATFORM_USER:
      return {
        ...state,
        view_platform_user: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default ViewPlatformUserReducer;
