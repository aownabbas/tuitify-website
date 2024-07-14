import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// Giists edit comment action displayed.
const giistEditComment = (
  params,
  bearerToken,
  onGiistEditCommentSuccess,
  onGiistEditCommentError
) => {
  return async (dispatch) => {
    // hitting API. This api is used to edit a giist comment.
    console.log(params, bearerToken);
    await GlobalApiCall(`${URL.khbaseUrl}editcomment`,
    'put',
    params,
    (res) => {
      console.log(res, "hello res")
      // if response true then dispatching action.
      dispatch(userGiistEditComment(res));
      // returning response to the success function.
      onGiistEditCommentSuccess(res);
    },
    (err) => {
      // if response false then returning response to the error function.
      console.log(err.response.data, "this is error");
      onGiistEditCommentError(err);
    },
    );
    // axios
    //   ({
    //     method: 'put',
    //     url: `${URL.khbaseUrl}editcomment`,
    //     headers: {
    //         Authorization : `Bearer ${bearerToken}`,
    //         'Content-Type': 'application/json',
    //     },
    //     data: params,
    // })
      
      // getting API response.
      // .then((res) => {
      //   console.log(res, "hello res")
      //   // if response true then dispatching action.
      //   dispatch(userGiistEditComment(res));
      //   // returning response to the success function.
      //   onGiistEditCommentSuccess(res);
      // })
      // .catch((err) => {
      //   // if response false then returning response to the error function.
      //   console.log(err.response.data, "this is error");
      //   onGiistEditCommentError(err);
      // });
  };
};

export default giistEditComment;

// dispatching methods inside action
const userGiistEditComment = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_EDIT_COMMENT,
    payload: data,
  };
};
