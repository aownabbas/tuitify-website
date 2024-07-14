import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { DEL_CHAP_MEDIA } from './types';

const delChapter = (del_chap_media) => {
  return {
    type: DEL_CHAP_MEDIA,
    payload: del_chap_media,
  };
};

export const DeleteGiistChapMedia = (paramsObj, onDeleteGiistChapMediaSuccess, onDeleteGiistChapMediaError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}giist/deleteChapterMedia`,
      'delete',
      paramsObj,
      (res) => {
        dispatch(delChapter(res.data));
        onDeleteGiistChapMediaSuccess(res.data);
      },
      (err) => {
        onDeleteGiistChapMediaError(err);
      },
    );
  };
};
