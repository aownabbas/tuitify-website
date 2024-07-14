import * as types from "../actions/types";

// initial state of reducer.
const initialState = {
    loading: false,
    sendChannel: [],
    error: '',
  };

// reducer function.
const SendChannelReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.SEND_CHANNEL:
      return {
        ...state,
        sendChannel: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default SendChannelReducer;

