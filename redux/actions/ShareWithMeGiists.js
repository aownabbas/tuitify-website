import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { SHARE_ME_GIISTS } from './types';

const fetchShareWithme = (share_with_me) => {
  return {
    type: SHARE_ME_GIISTS,
    payload: share_with_me,
  };
};

// https://khdev.tuitify.com/userGiists?limit=9&page=1&categoryIds=2&user_id=2&status=2
const ShareWithMeGiists = (params, token, onSharemeSuccess, onSharemeError) => {
  return (dispatch) => {
    axios
      .get(`${URL.khbaseUrl}userReceivedGiists?${params}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const share_with_me = res.data;
        onSharemeSuccess(share_with_me);
        dispatch(fetchShareWithme(share_with_me));
      })
      .catch((error) => {
        const msg = error.msg;
        onSharemeError(msg);
      });
  };
};
export default ShareWithMeGiists;
