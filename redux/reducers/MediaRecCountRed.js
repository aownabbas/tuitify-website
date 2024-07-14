import { COUNT_MEDIA } from '../actions/types';

const initialState = {
  loading: false,
  media_counting: [],
  error: '',
};

const MediaRecCountRed = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_MEDIA:
      return {
        loading: false,
        media_counting: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default MediaRecCountRed;
