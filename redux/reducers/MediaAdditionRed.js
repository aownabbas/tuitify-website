import { ADD_MEDIA } from '../actions/types';

const initialState = {
  loading: false,
  added_media: [],
  error: '',
};

const MediaAdditionRed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEDIA:
      return {
        loading: false,
        added_media: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default MediaAdditionRed;
