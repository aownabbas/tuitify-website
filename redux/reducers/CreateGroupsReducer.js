// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    createGroups: '',
};

// reducer function.
const createGroupsReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.CREATE_GROUPS:
      return {
        ...state,
        createGroups: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default createGroupsReducer;
