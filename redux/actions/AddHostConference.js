import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { ADD_HOST } from './types';

const fetchAddHost = (add_host) => {
  return { type: ADD_HOST, payload: add_host };
};

export const AddHostConference = (params, onAddhostSuccess, onAddhostError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/add/host`,
      'post',
      params,
      (res) => {
        console.log(res, 'the params of add host res');
        onAddhostSuccess(res.data);
        dispatch(fetchAddHost(res.data));
      },
      (err) => {
        onAddhostError(err);
      },
    );
  };
};
