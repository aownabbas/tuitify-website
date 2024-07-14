import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { COUNT_MEDIA } from './types';

export const fetchMediaCount = (media_counting) => {
  return {
    type: COUNT_MEDIA,
    payload: media_counting,
  };
};

const MediaRecCount = (token, onMediaCountActionSuccess, onMediaCountActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}mediaCount`,
    'get',
    {},
    (response) => {
      const mediaCountingResponse = response.data;
      onMediaCountActionSuccess(mediaCountingResponse);
      dispatch(fetchMediaCount(mediaCountingResponse));
    },
    (error) => {
      const errormsg = error.message;
      onMediaCountActionError(errormsg);
    },
    );
    // axios
    //   .get(`${URL.khbaseUrl}mediaCount`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const mediaCountingResponse = response.data;
    //     onMediaCountActionSuccess(mediaCountingResponse);
    //     dispatch(fetchMediaCount(mediaCountingResponse));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onMediaCountActionError(errormsg);
    //   });
  };
};
export default MediaRecCount;
