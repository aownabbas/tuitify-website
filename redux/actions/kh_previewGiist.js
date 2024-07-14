import axios from 'axios';
import * as types from './types';
// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// Giists edit action displayed.
const previewGiist = (params, onGiistPreviewSuccess, onGiistPreviewError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}previewGiist?${params}`,
      'get',
      {},
      (res) => {
        console.log(res, 'hello res edit');
        // if response true then dispatching action.
        dispatch(userGiistPreview(res));
        // returning response to the success function.
        onGiistPreviewSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err, 'this is error');
        onGiistPreviewError(err);
      },
    );
  };
};
export default previewGiist;

// dispatching methods inside action
const userGiistPreview = (data) => {
  return {
    // defining what type of action it is.
    type: types.Kh_PreView_Giist,
    payload: data,
  };
};
