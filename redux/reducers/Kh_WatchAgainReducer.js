import { KH_WATCH_AGAIN_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  watch_again_giists: [],
  error: '',
};

const Kh_WatchAgainReducer = (state = initialState, action) => {
  switch (action.type) {
    case KH_WATCH_AGAIN_GIISTS:
      return {
        loading: false,
        watch_again_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default Kh_WatchAgainReducer;
