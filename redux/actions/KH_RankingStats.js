import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { GET_STATS } from './types';

const fetchStats = (stats_data) => {
  return {
    type: GET_STATS,
    payload: stats_data,
  };
};

const RankingStats = (token, tokenModel) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}myRankingStats`,
    'get',
    {},
    (res) => {
      const stats_data = res.data;
      dispatch(fetchStats(stats_data));
    },
    (error) => {
      const msg = error.message;
      // console.log(msg, 'digital404');
      // if (msg == 'Request failed with status code 401') {
      //   tokenModel();
      //   alert('Login session expire')
      // }
    },
    );
    // axios
    //   .get(`${URL.khbaseUrl}myRankingStats`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const stats_data = res.data;
    //     dispatch(fetchStats(stats_data));
    //   })
    //   .catch((error) => {
    //     const msg = error.message;
    //     // console.log(msg, 'digital404');
    //     // if (msg == 'Request failed with status code 401') {
    //     //   tokenModel();
    //     //   alert('Login session expire')
    //     // }
    //   });
  };
};
export default RankingStats;
