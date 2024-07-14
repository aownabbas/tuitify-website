import { KH_WATCHED_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  watched_giists: [],
  error: '',
};

const Kh_WatchedGiistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case KH_WATCHED_GIISTS:
      return {
        loading: false,
        watched_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default Kh_WatchedGiistsReducer;
