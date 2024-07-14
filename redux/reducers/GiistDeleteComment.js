// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
  error: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: "",
  des: "",
  list: "",
};

// reducer function.
const giistDeleteCommentReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GIIST_DELETE_COMMENT:
      return {
        ...state,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default giistDeleteCommentReducer;
