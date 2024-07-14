// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    delete_platform: '',
};

// reducer function.
const DeletePlatformReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DELETE_PLATFORM:
      return {
        ...state,
        delete_platform: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default DeletePlatformReducer;
