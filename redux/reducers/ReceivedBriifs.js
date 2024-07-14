// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  error: false,
  // isReceivedBriifsLoading: true,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
};

const initialState2 = {
  error: false,
  data: null,
};

// reducer function.
const receivedBriifsReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.RECEIVED_BRIIFS:
      return {
        ...state,
        // isReceivedBriifsLoading: false,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export const userBriifsCount = (state = initialState2, action) => {
  switch (action.type) {
    case types.ALL_BRIIFS_COUNTS:
      return {
        ...state,
        // isReceivedBriifsLoading: false,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default receivedBriifsReducer;
