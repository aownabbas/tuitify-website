import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// get platform action displayed.
const getPlat = () => {
  return async (dispatch) => {
    // hitting API. This api is used getting platform data.
    await GlobalApiCall(
      `${URL.khbaseUrl}getplat`,
      'get',
      {},
      (res) => {
        const response = res.data;

        dispatch(userGetPlat(response));

        const full = window.location.host;
        const parts = full.split('.');
        const sub = parts[0];

        const allPlatforms = [...response.private_platforms, ...response.public_platforms];

        let matchedPlatform = allPlatforms.find((obj) => obj.name == sub);
        const name = matchedPlatform ? matchedPlatform.name : 'test';

        let result = allPlatforms.find((obj) => obj.name == name);
        let { link, aws_link, aws_bucket, aws_bucket_accessKey, aws_bucket_region, aws_bucket_secretKey, ...y } =
          result;
        dispatch(userPlatfrom(y));
        localStorage.setItem('@GetPlatData', JSON.stringify(y));
      },
      (err) => {
        // if response false then this code run.
        console.log(err);
      },
    );
  };
};

// dispatching methods inside action
const userGetPlat = (data) => {
  return {
    // defining what type of action it is.
    type: types.GET_PLAT,
    payload: data,
  };
};

const userPlatfrom = (userPlatfrom) => {
  return {
    type: types.USER_PLATFROM,
    payload: userPlatfrom,
  };
};
export default getPlat;
