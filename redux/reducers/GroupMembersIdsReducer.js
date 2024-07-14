// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    group_members_ids: '',
};

// reducer function.
const groupMembersIdsReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GROUP_MEMBERS_IDS:
      return {
        ...state,
        group_members_ids: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default groupMembersIdsReducer;
