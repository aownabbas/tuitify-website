// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
  error: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  giistEditData: [],
  briffDetails: "",
  des: "",
  list: "",
};

// reducer function.
const giistEditReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GIIST_EDIT:
      return {
        ...state,
        data: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default giistEditReducer;
