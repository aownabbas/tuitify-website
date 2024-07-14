import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";
import {
  DELETE_BRIIF,
  DELETE_BRIIFS,
  DELETE_COMMENTS,
  DELETE_GIIST,
  DELETE_GIIST_COMMENT,
  DELETE_INTERACTION,
  DELETE_MEETING,
} from "./types";

const delGiist = (delete_giist) => {
  return {
    type: DELETE_GIIST,
    payload: delete_giist,
  };
};

export const deleteGiistsAction = (
  params,
  onDeleteGiistSuccess,
  onDeleteGiistError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}kHubDashboardDeleteGiists`,
      "delete",
      params,
      (res) => {
        dispatch(delGiist(res.data));
        onDeleteGiistSuccess(res.data);
      },
      (err) => {
        onDeleteGiistError(err);
      }
    );
  };
};

const delGiistComment = (delete_giist_comment) => {
  return {
    type: DELETE_GIIST_COMMENT,
    payload: delete_giist_comment,
  };
};

export const deleteGiistsCommentAction = (
  params,
  onDeleteGiistCommentSuccess,
  onDeleteGiistCommentError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}kHubDashboardDeleteGiists`,
      "delete",
      params,
      (res) => {
        dispatch(delGiistComment(res.data));
        onDeleteGiistCommentSuccess(res.data);
      },
      (err) => {
        onDeleteGiistCommentError(err);
      }
    );
  };
};

const deleteBriif = (delete_briif) => {
  return {
    type: DELETE_BRIIF,
    payload: delete_briif,
  };
};

export const deleteBriifAction = (
  params,
  onDeleteBriifSuccess,
  onDeleteBriifError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}deleteBriffs`,
      "delete",
      params,
      (res) => {
        dispatch(deleteBriif(res.data));
        onDeleteBriifSuccess(res.data);
      },
      (err) => {
        onDeleteBriifError(err);
      }
    );
  };
};

const deleteMetting = (delete_meeting) => {
  return {
    type: DELETE_MEETING,
    payload: delete_meeting,
  };
};

export const deleteMeetingAction = (
  params,
  onDeleteMeetingSuccess,
  onDeleteMeetingError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}delete_meeting?${params}`,
      "get",
      {},
      (res) => {
        dispatch(deleteMetting(res.data));
        onDeleteMeetingSuccess(res.data);
      },
      (err) => {
        onDeleteMeetingError(err);
      }
    );
  };
};

const deleteBriifComment = (delete_briifs) => {
  return {
    type: DELETE_BRIIFS,
    payload: delete_briifs,
  };
};

export const deleteBriifComments = (
  params,
  onDeleteBriifsSuccess,
  onDeleteBriifsError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}deleteBriffComments`,
      "delete",
      params,
      (res) => {
        dispatch(deleteBriifComment(res.data));
        onDeleteBriifsSuccess(res.data);
      },
      (err) => {
        onDeleteBriifsError(err);
      }
    );
  };
};

const deleteInteractionDetail = (delete_interaction) => {
  return {
    type: DELETE_INTERACTION,
    payload: delete_interaction,
  };
};

export const deleteInteractionsDetail = (
  params,
  onDeleteInteractionSuccess,
  onDeleteInteractionError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}kHubDashboardDeleteComments`,
      "delete",
      params,
      (res) => {
        dispatch(deleteInteractionDetail(res.data));
        onDeleteInteractionSuccess(res.data);
      },
      (err) => {
        onDeleteInteractionError(err);
      }
    );
  };
};

const deleteUserComments = (delete_comments) => {
  return {
    type: DELETE_COMMENTS,
    payload: delete_comments,
  };
};

export const deleteUserCommentsAction = (
  params,
  onDeleteUserCommentsSuccess,
  onDeleteUserCommentsError
) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}delete_user_comments?${params}`,
      "delete",
      {},
      (res) => {
        dispatch(deleteUserComments(res.data));
        onDeleteUserCommentsSuccess(res.data);
      },
      (err) => {
        onDeleteUserCommentsError(err);
      }
    );
  };
};
