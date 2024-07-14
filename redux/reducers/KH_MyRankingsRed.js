import { GET_MY_RANKINGS } from '../actions/types';

const initialState = {
  loading: false,
  user_rankings: [],
  error: '',
};

const MyRankingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_RANKINGS:
      return {
        loading: false,
        user_rankings: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};

export default MyRankingsReducer;
