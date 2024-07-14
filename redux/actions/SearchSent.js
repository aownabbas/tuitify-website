import axios from 'axios';
import { FETCH_SEARCH_SEND } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchSearchSend = (searchSend) => {
  return {
    type: FETCH_SEARCH_SEND,
    payload: searchSend,
  };
};

const actionSearchSend = (params, onSuccessSend, onErrorSend) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}search_send?${params}`,
      'get',
      {},
      (response) => {
        const searchSend = response.data.send;
        dispatch(fetchSearchSend(searchSend));
        onSuccessSend(response.data);
      },
      (error) => {
        const errormsg = error.message;
        onErrorSend(errormsg);
      },
    );
  };
};
export default actionSearchSend;
