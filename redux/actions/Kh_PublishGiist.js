import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { Kh_Publish_Giist } from './types';

const publishGiistRes = (res) => {
  return {
    type: Kh_Publish_Giist,
    payload: res,
  };
};

const Kh_PublishGiist = (params, token, onPublishGiistSuccess, onPublishGiistError) => {
  console.log('params =>', params);
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}publishGiist`,
      'put',
      params,
      (res) => {
        dispatch(publishGiistRes(res.data));
        onPublishGiistSuccess(res.data);
      },
      (err) => {
        onPublishGiistError(err);
      },
    );
    console.log('token =>', token);
    // axios({
    //   method: 'put',
    //   url: `${URL.khbaseUrl}publishGiist`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: params,
    // })
    //   .then((res) => {
    //     dispatch(publishGiistRes(res.data));
    //     onPublishGiistSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     onPublishGiistError(err);
    //   });
  };
};

export default Kh_PublishGiist;
