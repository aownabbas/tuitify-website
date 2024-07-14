import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// Giists delete comment action displayed.
const giistDeleteComment = (
  params,
  bearerToken,
  onGiistDeleteCommentSuccess,
  onGiistDeleteCommentError
) => {
  return async (dispatch) => {
    // hitting API. This api is used to delete a giist comment.
    await GlobalApiCall(`${URL.khbaseUrl}deletecomment?${params}`,
    'delete',
    {},
    (res) => {
      console.log(res, "hello res")
      // if response true then dispatching action.
      dispatch(userGiistDeleteComment(res));
      // returning response to the success function.
      onGiistDeleteCommentSuccess(res);
    },
    (err) => {
      // if response false then returning response to the error function.
      console.log(err, "this is error");
      onGiistDeleteCommentError(err);
    },
    )
    console.log(params);
    // axios
    //   ({
    //     method: 'delete',
    //     url: `${URL.khbaseUrl}deletecomment?${params}`,
    //     // data: ,
    //     headers: {"Authorization" : `Bearer ${bearerToken}`} })
      
    //   // getting API response.
    //   .then((res) => {
    //     console.log(res, "hello res")
    //     // if response true then dispatching action.
    //     dispatch(userGiistDeleteComment(res));
    //     // returning response to the success function.
    //     onGiistDeleteCommentSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     console.log(err, "this is error");
    //     onGiistDeleteCommentError(err);
    //   });
  };
};

export default giistDeleteComment;

// dispatching methods inside action
const userGiistDeleteComment = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_DELETE_COMMENT,
    payload: data,
  };
};
