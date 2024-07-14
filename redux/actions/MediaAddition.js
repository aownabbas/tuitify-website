import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { ADD_MEDIA } from './types';

export const insertMedia = (media_addition) => {
  return {
    type: ADD_MEDIA,
    payload: media_addition,
  };
};

// const MediaAddition = (token, data, onMediaAdditionSuccess, onMediaAdditionError) => {
const MediaAddition = (token, data) => {
  return async (dispatch) => {

    console.log(token, 'all the token');
    // headers: {
    //       Authorization: 'Bearer ' + accessToken,
    //       'Content-Type': 'application/json',
    //     },

    await GlobalApiCall(`${URL.khbaseUrl}addMedia`,
    'post',
    data,
    (response) => {
      const addedMediaResponse = response;
      console.log(addedMediaResponse, 'response by added');
      // onMediaAdditionSuccess(addedMediaResponse);
      // dispatch(insertMedia(addedMediaResponse));
    },
    (error) => {
      const errormsg = error.message;
      console.log(errormsg);
      // onMediaAdditionError(errormsg);
    },
    );
    // axios
    //   .post(
    //     `${URL.khbaseUrl}addMedia`,
    //     {
    //       headers: { Authorization: token, 'Content-Type': 'application/json' },
    //     },
    //     data,
    //     // { Authorization: `${token}` },
    //   )
    //   .then((response) => {
    //     const addedMediaResponse = response;
    //     console.log(addedMediaResponse, 'response by added');
    //     // onMediaAdditionSuccess(addedMediaResponse);
    //     // dispatch(insertMedia(addedMediaResponse));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     console.log(errormsg);
    //     // onMediaAdditionError(errormsg);
    //   });
  };
};
export default MediaAddition;
