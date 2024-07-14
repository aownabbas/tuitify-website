import { Final_Attempted } from '../actions/types';

const initialState = {
  loading: false,
  Final_Attempted: [],
  error: '',
};

const kh_FinalQuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case Final_Attempted:
      return {
        loading: false,
        Final_Attempted: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default kh_FinalQuizReducer;
