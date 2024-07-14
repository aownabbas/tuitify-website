import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { DEL_MEDIA } from './types';

// dispatching methods inside action
const deleteMedia = (del_media) => {
  return {
    type: DEL_MEDIA,
    payload: del_media,
  };
};

// https://khdev.tuitify.com/deleteMedia?id=527

const DelMedia = (token, params, onDeleteMediaSuccess, onDeleteMediaError) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}deleteMedia?${params}`,
    'delete',
    {},
    (res) => {
      dispatch(deleteMedia(res));
      onDeleteMediaSuccess(res);
    },
    (err) => {
      onDeleteMediaError(err);
    },
    )
    // axios
    //   .delete(`${URL.khbaseUrl}deleteMedia?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     dispatch(deleteMedia(res));
    //     onDeleteMediaSuccess(res);
    //   })
    //   .catch((err) => {
    //     onDeleteMediaError(err);
    //   });
  };
};

export default DelMedia;
