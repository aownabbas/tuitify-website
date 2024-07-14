import axios from 'axios';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { DEL_GIIST } from './types';

// dispatching methods inside action
const userDeleteGiist = (delete_giist) => {
  return {
    // defining what type of action it is.
    type: DEL_GIIST,
    payload: delete_giist,
  };
};

// delete send briif action displayed.
// https://khdev.tuitify.com/userGiistDelete/2679

const DelUserGiist = (token, params, onDeleteGiistSuccess, onDeleteGiistError) => {
  // console.log(`userGiistDelete/${params}`, 'ajc');
  return async (dispatch) => {
    // hitting API. This api is used for deleting send briif.
    await GlobalApiCall(`${URL.khbaseUrl}userGiistDelete/${params}`,
    'delete',
    {},
    (res) => {
      // if response true then dispatching action.
      dispatch(userDeleteGiist(res));
      // returning response to the success function.
      onDeleteGiistSuccess(res);
    },
    (err) => {
      // if response false then returning response to the error function.
      onDeleteGiistError(err);
    },
    )
    // axios
    //   .delete(`${URL.khbaseUrl}userGiistDelete/${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   // getting API response.
    //   .then((res) => {
    //     // if response true then dispatching action.
    //     dispatch(userDeleteGiist(res));
    //     // returning response to the success function.
    //     onDeleteGiistSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     onDeleteGiistError(err);
    //   });
  };
};

export default DelUserGiist;
