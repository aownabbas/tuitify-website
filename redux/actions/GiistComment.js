import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// Giists interaction action displayed.
const giistCommentData = (params, bearerToken, onGiistCommentsSuccess, onGiistCommentsError) => {
  return async (dispatch) => {
    // hitting API. This api is used for getting the giist interaction data.

    await GlobalApiCall(
      `${URL.khbaseUrl}comments?${params}`,
      'get',
      {},
      (res) => {
        console.log(res, 'hello res');
        // if response true then dispatching action.
        dispatch(userGiistComment(res));
        // returning response to the success function.
        onGiistCommentsSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err?.response?.data, 'this is error');
        onGiistCommentsError(err);
      },
    );
    // axios
    //   .get(`${URL.khbaseUrl}comments?${params}`,{
    //     headers: {"Authorization" : `Bearer ${bearerToken}`} })

    //   // getting API response.
    //   .then((res) => {
    //     console.log(res, "hello res")
    //     // if response true then dispatching action.
    //     dispatch(userGiistComment(res));
    //     // returning response to the success function.
    //     onGiistCommentsSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     console.log(err.response.data, "this is error");
    //     onGiistCommentsError(err);
    //   });
  };
};

export default giistCommentData;

// dispatching methods inside action
const userGiistComment = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_COMMENTS,
    payload: data,
  };
};
