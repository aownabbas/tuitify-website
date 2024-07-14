import { DELETE_QUSETION } from "../actions/types";

const initialState = {
  msg: [],
};

// reducer function.
const khQuizQuestionDelete = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_QUSETION:
      return {
        ...state,
        msg: action.payload.res,
      };
    // default statement.
    default:
      return state;
  }
};


export default khQuizQuestionDelete;
