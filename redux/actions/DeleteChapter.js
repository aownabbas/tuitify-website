import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { DEL_CHAPTER } from './types';
import { GlobalApiCall } from '../GlobalApiCall';

// dispatching methods inside action
const delChapter = (del_chap) => {
  return {
    type: DEL_CHAPTER,
    payload: del_chap,
  };
};

// https://khdev.tuitify.com/giist/deleteChapter

const DeleteChapter = (token, params, onDeleteChapterSuccess, onDeleteChapterError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}giist/deleteChapter`,
    'delete',
    params,
    (res) => {
      dispatch(delChapter(res.data));
      onDeleteChapterSuccess(res.data);
    },
    (err) => {
      onDeleteChapterError(err);
    }
    )
    // axios({
    //   method: 'delete',
    //   url: `${URL.khbaseUrl}giist/deleteChapter`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: params,
    // })
    //   .then((res) => {
    //     dispatch(delChapter(res.data));
    //     onDeleteChapterSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     onDeleteChapterError(err);
    //   });
  };
};

export default DeleteChapter;
