// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
    create_category: '',
};

// reducer function.
const CreateCategoriesReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.CREATE_CATEGORY:
      return {
        ...state,
        create_category: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default CreateCategoriesReducer;
