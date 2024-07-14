import { PUBLISHED_GIISTS } from '../actions/types';

const initialState = {
  loading: false,
  published_giists: [],
  error: '',
};

const PublishedGiists = (state = initialState, action) => {
  switch (action.type) {
    case PUBLISHED_GIISTS:
      return {
        loading: false,
        published_giists: action.payload,
        error: '',
      };
      break;
    default:
      return state;
  }
};
export default PublishedGiists;
