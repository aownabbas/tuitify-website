import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// Giist post comment action displayed.
const giistPostComment = (params, bearerToken, onGiistPostCommentSuccess, onGiistPostCommentError) => {
  return async (dispatch) => {
    // hitting API. This api is used to post a giist comment.
    await GlobalApiCall(
      `${URL.khbaseUrl}postcomment`,
      'post',
      params,
      (res) => {
        console.log(JSON.stringify(res), 'hello res');
        // if response true then dispatching action.
        dispatch(userGiistPostComment(res));
        // returning response to the success function.
        onGiistPostCommentSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        console.log(err?.response?.data, 'this is error');
        onGiistPostCommentError(err);
      },
    );
    console.log(params);
    // axios
    //   ({
    //     method: 'post',
    //     url: `${URL.khbaseUrl}postcomment`,
    //     headers: {
    //         Authorization : `Bearer ${bearerToken}`,
    //         'Content-Type': 'application/json',
    //     },
    //     data: params,
    // })

    //   // getting API response.
    //   .then((res) => {
    //     console.log(JSON.stringify(res), "hello res")
    //     // if response true then dispatching action.
    //     dispatch(userGiistPostComment(res));
    //     // returning response to the success function.
    //     onGiistPostCommentSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     console.log(err.response.data, "this is error");
    //     onGiistPostCommentError(err);
    //   });
  };
};

export default giistPostComment;

// dispatching methods inside action
const userGiistPostComment = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_POST_COMMENT,
    payload: data,
  };
};
