import axios from "axios";
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";
import { KH_QUIZDELETE } from "./types";

const chapterQuizDelete = (res) => {
  return {
    type: KH_QUIZDELETE,
    payload: res,
  };
};

const KH_ChapterQuizDelete = (
  params,
  token,
  onQuizDeleteSubmitSuccess,
  onQuizDeleteSubmitError
) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}giist/deleteQuiz`,
      'delete',
      params,
      (res) => {
        dispatch(chapterQuizDelete(res.data));
        onQuizDeleteSubmitSuccess(res.data);
      },
      (err) => {
        onQuizDeleteSubmitError(err);
      },
    );
  };
};

export default KH_ChapterQuizDelete;
