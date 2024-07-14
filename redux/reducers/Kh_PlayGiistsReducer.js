import { KH_PLAY_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  play_giists: {},
  error: '',
};

const Kh_PlayGiistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case KH_PLAY_GIISTS:
      return {
        loading: false,
        play_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default Kh_PlayGiistsReducer;
