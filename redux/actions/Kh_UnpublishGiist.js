import axios from 'axios';
import { Kh_UnPublish_Giist } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchUnPublishGiists = (UnPublish_giist) => {
  return {
    type: Kh_UnPublish_Giist,
    payload: UnPublish_giist,
  };
};

const Kh_UnpublishGiist = (params, token, onUnPublishGiistSuccess, onUnPublishGiistError) => {
  // https://khdev.tuitify.com/unPublishGiist?id=178
  return async (dispatch) => {
    try {
      await dispatch({
        type: Kh_UnPublish_Giist,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}unPublishGiist?id=${params}`,
        'put',
        {},
        (res) => {
          dispatch(fetchUnPublishGiists(res.data));
          console.log(res, 'res in action');
          onUnPublishGiistSuccess(res.data);
        },
        (err) => {
          console.log(err, 'res in action');
          onUnPublishGiistError(err);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export default Kh_UnpublishGiist;
