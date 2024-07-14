import axios from 'axios';
import { KH_PLAY_GIISTS } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchPlayGiist = (play_giists) => {
  return {
    type: KH_PLAY_GIISTS,
    payload: play_giists,
  };
};

const Kh_playGiistsAction = (params, token, onPlayGiistsSuccess, onPlayGiistsError) => {
  return async (dispatch) => {
    // var axios = require('axios');
    await GlobalApiCall(`${URL.khbaseUrl}chapsubchap?${params}`,
    'put',
    {},
    function (response) {
      console.log(response.data);
      const play_giists = response.data;
      onPlayGiistsSuccess(play_giists);
      dispatch(fetchPlayGiist(play_giists));
    },
    function (error) {
      console.log(error);
      onPlayGiistsError(error);
    },
    )
    // var config = {
    //   method: 'put',
    //   url: `${URL.khbaseUrl}chapsubchap?${params}`,
    //   headers: { Authorization: `Bearer ${token}` },
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(response.data);
    //     const play_giists = response.data;
    //     onPlayGiistsSuccess(play_giists);
    //     dispatch(fetchPlayGiist(play_giists));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     onPlayGiistsError(error);
    //   });
  };
};
export default Kh_playGiistsAction;
