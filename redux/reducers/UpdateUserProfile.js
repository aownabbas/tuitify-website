// getting all the types from the file types.js in actions folder.
import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
  cities: [],
  briffDetails: "",
  updateUserProfileData: [],
};

// reducer function.
const updateUserProfileReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.UPDATE_USER_PROFILE:
      return {
        ...state,
        updateUserProfileData: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default updateUserProfileReducer;
