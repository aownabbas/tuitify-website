// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
  globalSearchKeyword: "all",
};

// reducer function.
const globalSearchTabsReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GLOBAL_SEARCH_TABS:
      return {
        ...state,
        globalSearchKeyword: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default globalSearchTabsReducer;
