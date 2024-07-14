// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    group_members: '',
};

// reducer function.
const groupMembersReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GROUP_MEMBERS:
      return {
        ...state,
        group_members: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default groupMembersReducer;
