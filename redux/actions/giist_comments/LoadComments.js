import { URL } from '../../../public/assets/path/path';
import GlobalApiNew from '../../GlobalApiNew';
import {
  CLEAR_COMMENTS,
  DELETING_COMMENT,
  FETCH_DATA_LOADING,
  FETCH_PARTIAL_DATA_LOADING,
  GIIST_COMMENT_REACTION,
  GIIST_EDIT_COMMENT,
  GIIST_POST_COMMENT,
  LOAD_ALL_COMMENTS,
} from '../types';

const FeatchAllComments = (all_comments) => {
  return { type: LOAD_ALL_COMMENTS, payload: all_comments };
};

const FetchInsertedLoadComments = (inserted_comments) => {
  return { type: GIIST_POST_COMMENT, payload: inserted_comments };
};

const FetchEditLoadComments = (edited_comments, data) => {
  console.log(edited_comments, data, 'edited_comments, data');
  return { type: GIIST_EDIT_COMMENT, payload: { response: edited_comments, commentData: data } };
};

const FetchDeleteLoadComments = (delId, delResponse) => {
  return { type: DELETING_COMMENT, payload: { delId: delId, delResponse: delResponse } };
};

const FetchReactionsComment = (res_api, commentId, statusType) => {
  console.log(res_api, commentId, statusType, 'data like in action');
  return {
    type: GIIST_COMMENT_REACTION,
    payload: { res_api: res_api, commentId: commentId, statusType: statusType },
  };
};

export const CearComments = () => {
  return { type: CLEAR_COMMENTS };
};

export const LoadComments = (params) => {
  return async (dispatch) => {
    await dispatch({ type: FETCH_DATA_LOADING });
    await GlobalApiNew(
      `${URL.khbaseUrl}comments?${params}`,
      'GET',
      {},
      async (response) => {
        const commentsData = await response;
        console.log(commentsData, 'comments data in action');
        dispatch(FeatchAllComments(commentsData));
      },
      (error) => {
        const errormsg = error.message;
        console.log(errormsg, 'error message');
      },
    );
  };
};

export const InsertLoadComments = (data) => {
  return async (dispatch) => {
    await dispatch({ type: FETCH_DATA_LOADING });
    await GlobalApiNew(
      `${URL.khbaseUrl}postcomment`,
      'POST',
      data,
      async (response) => {
        const data = await response;
        dispatch(FetchInsertedLoadComments(data));
      },
      (error) => {
        const errormsg = error.message;
        console.log(errormsg, 'error message');
      },
    );
  };
};

export const editLoadComments = (data) => {
  return async (dispatch) => {
    await dispatch({ type: FETCH_PARTIAL_DATA_LOADING });
    // await dispatch({ type: FETCH_DATA_LOADING });
    await GlobalApiNew(
      `${URL.khbaseUrl}editcomment`,
      'put',
      data,
      async (res) => {
        const editResponse = await res?.data;
        dispatch(FetchEditLoadComments(editResponse, data));
      },
      (error) => {
        const msg = error.message;
        console.log(msg, 'error in edit');
      },
    );
  };
};

export const deleteLoadComments = (data) => {
  const { commentId, last_comment_id } = data;
  return async (dispatch) => {
    await dispatch({ type: FETCH_DATA_LOADING });
    await GlobalApiNew(
      `${URL.khbaseUrl}deletecomment?id=${commentId}&last_comment_id=${last_comment_id}`,
      'delete',
      {},
      async (res) => {
        const delResponse = await res?.data;
        await dispatch(FetchDeleteLoadComments(commentId, delResponse));
      },
      (error) => {
        dispatch({ error: error });
      },
    );
  };
};

export const ReactionOnComment = (data) => {
  return async (dispatch) => {
    // await dispatch({ type: FETCH_DATA_LOADING });
    await GlobalApiNew(
      `${URL.khbaseUrl}reactcomment`,
      'post',
      data,
      async (res) => {
        const commentRes = await res?.data;
        console.log(commentRes, 'commentRes action');
        await dispatch(FetchReactionsComment(commentRes, data.comment_id, data.status));
      },
      (error) => {
        dispatch({ error: error });
      },
    );
  };
};
