// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
  error: false,
  isLoading: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  createdGiistDetailData: [],
  briffDetails: "",
  data: [],
};

// reducer function.
const giistDetailDataReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.GIIST_DETAIL_DATA:
      return {
        ...state,
        // data: action.payload.res,
        createdGiistDetailData: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default giistDetailDataReducer;
