// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  error: false,
  isLoading: false,
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
  isLoading: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
};

// reducer function.
const deleteSendBriifReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DELETE_SEND:
      return {
        ...state,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default deleteSendBriifReducer;

export const deleteDraftBriifReducer = (state = initialState2, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DRAFT_BRIIFS_DELETE:
      return {
        ...state,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};
