import axios from 'axios';
import { FETCH_SEARCH_ARCHIVE } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchSearchArchive = (searchArchive) => {
  return {
    type: FETCH_SEARCH_ARCHIVE,
    payload: searchArchive,
  };
};

const actionSearchArchive = (params, onSuccessArchive, onErrorArchive) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}search_archive?${params}`,
      'get',
      {},
      (response) => {
        const searchArchive = response.data;
        dispatch(fetchSearchArchive(searchArchive));
        onSuccessArchive(response.data);
      },
      (error) => {
        const errormsg = error.message;
        onErrorArchive(errormsg);
      },
    );
  };
};
export default actionSearchArchive;
