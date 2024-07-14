import { LIBRARY_MEDIAS } from '../actions/types';

const initialState = {
  loading: false,
  library_media: [],
  error: '',
};

const MediaCollectionRed = (state = initialState, action) => {
  switch (action.type) {
    case LIBRARY_MEDIAS:
      return {
        loading: false,
        library_media: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default MediaCollectionRed;
