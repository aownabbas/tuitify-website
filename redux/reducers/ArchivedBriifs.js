// getting all the types from the file types.js in actions folder.
import * as types from '../actions/types';

// initial state of reducer.
const initialState = {
  error: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
  archivebriifsdata: {},
  data: {},
};

const initialState2 = {
  error: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
  archivebriifsdata: {},
  data: {},
};

// reducer function.
const archivedBriifsReducer = (state = initialState, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.ARCHIVED_BRIIFS:
      return {
        ...state,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

// reducer function.
export const draftBriifsReducer = (state = initialState2, action) => {
  // switch statement to check which block of code to will run based on action type.
  switch (action.type) {
    case types.DRAFT_BRIIFS:
      return {
        ...state,
        data: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};

export default archivedBriifsReducer;
