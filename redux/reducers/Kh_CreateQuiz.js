import * as types from "../actions/types";

const initialState = {
  quiz: [],
};

// reducer function.
const KhCreateQuiz = (state = initialState, action) => {
  switch (action.type) {
    case types.KH_Quiz:
      return {
        ...state,
        quiz: action.payload,
      };
    // default statement.
    default:
      return state;
  }
};

export default KhCreateQuiz;
