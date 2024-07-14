// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
  error: false,
  isPlayedBriifLoading: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: "",
  des: "",
  list: "",
};

// reducer function.
const playedBriifReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.PLAYED_BRIIF:
      return {
        ...state,
        isPlayedBriifLoading: true,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default playedBriifReducer;
