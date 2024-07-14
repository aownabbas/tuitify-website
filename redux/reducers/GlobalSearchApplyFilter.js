// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";
 
// initial state of reducer.
const initialState = {
  inputValue: "",
  filter: false,
  indexNum: 0,
};

// reducer function.
const globalSearchApplyFilterReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GLOBAL_SEARCH_APPLY_FILTER:
      return {
        ...state,
        inputValue: action.payload[0],
        filter: action.payload[1],
        indexNum:  action.payload[2],
      };
    // default statement.
    default:
      return state;
  }
};

export default globalSearchApplyFilterReducer;
