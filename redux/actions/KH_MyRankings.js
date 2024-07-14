import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { GET_MY_RANKINGS } from './types';

function fetchUserRankings(user_rankings) {
  return {
    type: GET_MY_RANKINGS,
    payload: user_rankings,
  };
}

const MyRankings = (token) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}rankingOverview?page=1&limit=10&search`,
    'get',
    {},
    (res) => {
      const user_rankings = res.data;
      dispatch(fetchUserRankings(user_rankings));
    },
    (err) => {
      const msg = err.msg;
    },
    )
    // axios
    //   .get(`${URL.khbaseUrl}rankingOverview?page=1&limit=10&search`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const user_rankings = res.data;
    //     dispatch(fetchUserRankings(user_rankings));
    //   })
    //   .catch((err) => {
    //     const msg = err.msg;
    //   });
  };
};

export default MyRankings;
