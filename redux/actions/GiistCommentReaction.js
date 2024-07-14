import axios from "axios";
import * as types from "./types";

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";

// Giists comment reaction action displayed.
const giistCommentReaction = (
  params,
  bearerToken,
  onGiistCommentReactionSuccess,
//   onGiistCommentReactionError
) => {
  return async (dispatch) => {
    // hitting API. This api is used for give reaction on a giist comment.

    await GlobalApiCall(`${URL.khbaseUrl}reactcomment`,
    'post',
    params,
    (res) => {
      console.log(res, "hello res")
      // if response true then dispatching action.
      dispatch(userGiistCommentReaction(res));
      // returning response to the success function.
      onGiistCommentReactionSuccess(res);
    },
    (err) => {
      // if response false then returning response to the error function.
      console.log(err, "this is error");
      // onGiistCommentReactionError(err);
    },
    )
    console.log(params);
    // axios
    //   ({
    //     method: 'post',
    //     url: `${URL.khbaseUrl}reactcomment`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization : `Bearer ${bearerToken}`,
    //     },
    //     data: params,
    // })
      
    //   // getting API response.
    //   .then((res) => {
    //     console.log(res, "hello res")
    //     // if response true then dispatching action.
    //     dispatch(userGiistCommentReaction(res));
    //     // returning response to the success function.
    //     onGiistCommentReactionSuccess(res);
    //   })
    //   .catch((err) => {
    //     // if response false then returning response to the error function.
    //     console.log(err, "this is error");
    //     // onGiistCommentReactionError(err);
    //   });
  };
};

export default giistCommentReaction;

// dispatching methods inside action
const userGiistCommentReaction = (data) => {
  return {
    // defining what type of action it is.
    type: types.GIIST_COMMENT_REACTION,
    payload: data,
  };
};
