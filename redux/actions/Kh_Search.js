import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { Kh_Search } from './types';

const KhSearchData = (search) => {
  return {
    type: Kh_Search,
    payload: search,
  };
};

const KH_Search = (paramsSearch, onSearchSuccess, onSearchError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}publishedGiists?${paramsSearch}`,
      'get',
      {},
      (res) => {
        const search = res.data;
        // console.log(search, 'search in action');
        dispatch(KhSearchData(search));
        onSearchSuccess(search);
      },
      (err) => {
        const msg = err.msg;
        onSearchError(msg);
      },
    );
  };
};

export default KH_Search;
