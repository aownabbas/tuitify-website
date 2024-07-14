import * as types from "../actions/types";

const initialState = {
  quizDelete: [],
};

// reducer function.
const KhChapterQuizDelete = (state = initialState, action) => {
  switch (action.type) {
    case types.KH_QUIZDELETE:
      return {
        ...state,
        quizDelete: action.payload,
      };
    default:
      return state;
  }
};

export default KhChapterQuizDelete;
