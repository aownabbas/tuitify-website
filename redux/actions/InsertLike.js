import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// insert like for giist action displayed.
const insertLike = (params, onInsertLikeSuccess, onInsertLikeError) => {
  return async (dispatch) => {
    // hitting API. This api is used for liking and un liking the giist.
    await GlobalApiCall(
      `${URL.khbaseUrl}insert_like?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userInsertLike(res));
        // returning response to the success function.
        onInsertLikeSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onInsertLikeError(err);
      },
    );
  };
};

// dispatching methods inside action
const userInsertLike = (data) => {
  return {
    // defining what type of action it is.
    type: types.INSERT_LIKE,
    payload: data,
  };
};
export default insertLike;
