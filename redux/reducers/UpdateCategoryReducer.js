// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    update_category: '',
};

// reducer function.
const UpdateCategoryReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.UPDATE_CATEGORY:
      return {
        ...state,
        update_category: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default UpdateCategoryReducer;
