import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// interaction insert comment action displayed.
const interactionInsertComment = (params, onInteractionInsertCommentSuccess, onInteractionInsertCommentError) => {
  return async (dispatch) => {
    // hitting API. This api is used for inserting a comment on the specific briif in the interaction.
    await GlobalApiCall(
      `${URL.khbaseUrl}insert_comment?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userInteractionInsertComment(res));
        // returning response to the success function.
        onInteractionInsertCommentSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onInteractionInsertCommentError(err);
      },
    );
  };
};

export default interactionInsertComment;

// dispatching methods inside action
const userInteractionInsertComment = (data) => {
  return {
    // defining what type of action it is.
    type: types.INTERACTION_INSERT_COMMENT,
    payload: data,
  };
};
