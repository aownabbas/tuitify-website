import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { LIBRARY_MEDIAS } from './types';

export const fetchMedias = (medias_in_library) => {
  return {
    type: LIBRARY_MEDIAS,
    payload: medias_in_library,
  };
};

const MediaCollection = (params, token, onMediaActionSuccess, onMediaActionError) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}medias?${params}`,
    'get',
    {},
    (response) => {
      const mediaResponse = response.data;
      onMediaActionSuccess(mediaResponse);
      dispatch(fetchMedias(mediaResponse));
    },
    (error) => {
      const errormsg = error.message;
      onMediaActionError(errormsg);
    },
    );
    // axios
    //   .get(`${URL.khbaseUrl}medias?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const mediaResponse = response.data;
    //     onMediaActionSuccess(mediaResponse);
    //     dispatch(fetchMedias(mediaResponse));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onMediaActionError(errormsg);
    //   });
  };
};
export default MediaCollection;
