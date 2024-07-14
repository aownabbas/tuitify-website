import { KH_PLAY_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  Preview_giists: {},
  error: '',
};

const kh_PreviewGiistReducer = (state = initialState, action) => {
  switch (action.type) {
    case KH_PLAY_GIISTS:
      return {
        loading: false,
        Preview_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default kh_PreviewGiistReducer;
