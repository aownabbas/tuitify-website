import * as types from "../actions/types";

const initialState = {
  error: false,
  // isSendBriifsLoading: false,
  isSuccess: false,
  isRead: null,
  briffs: null,
  cities: [],
  briffDetails: '',
  des: '',
  list: '',
}

const sendBriifsReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case types.SEND_BRIIFS:
      return {
        ...state,
        // isSendBriifsLoading: true,
        data: action.payload.res,
      };
    default:
      return state;
  }
};

export default sendBriifsReducer;
