import { DEL_CHAP_MEDIA } from '../actions/types';

const initialState = {
  loading: false,
  del_chap_media: [],
  error: false,
};

export const DeleteGiistChapMediaRed = (state = initialState, action) => {
  switch (action.type) {
    case DEL_CHAP_MEDIA:
      return {
        ...state,
        del_chap_media: action.payload.res,
      };
    default:
      return state;
  }
};
