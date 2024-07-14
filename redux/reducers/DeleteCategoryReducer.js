// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    delete_category: '',
};

// reducer function.
const DeleteCategoryReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DELETE_CATEGORY:
      return {
        ...state,
        delete_category: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default DeleteCategoryReducer;
