// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    delete_group_member: '',
};

// reducer function.
const DeleteGroupMemberReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DELETE_GROUP_MEMBER:
      return {
        ...state,
        delete_group_member: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default DeleteGroupMemberReducer;
