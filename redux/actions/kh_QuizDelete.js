import axios from "axios";
import { URL } from "../../public/assets/path/path";
import { GlobalApiCall } from "../GlobalApiCall";
import { DELETE_QUSETION } from "./types";

const deletequizQuestion = (res) => {
  return {
    type: DELETE_QUSETION,
    payload: res,
  };
};

const kh_QuizQuestionDelete = (
  params,
  token,
  onQuizDeleteSuccess,
  onQuizDeleteError,
  question_id
) => {
  console.log("params =>", params);
  return async (dispatch) => {
    console.log("token =>", token);
    await GlobalApiCall(`${URL.khbaseUrl}quiz/deleteQuestion`,
      'delete',
      params,
      (res) => {
        dispatch(deletequizQuestion(res.data));
        onQuizDeleteSuccess(res.data, question_id);
      },
      (err) => {
        onQuizDeleteError(err);
      },
    )
    // axios({
    //   method: "delete",
    //   url: `${URL.khbaseUrl}quiz/deleteQuestion`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: params,
    // })
    //   .then((res) => {
    //     dispatch(deletequizQuestion(res.data));
    //     onQuizDeleteSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     onQuizDeleteError(err);
    //   });
  };
};

export default kh_QuizQuestionDelete;

export const kh_QuizOptionDelete = (
  paramsQuiz,
  token,
  onQuizDeleteSuccess,
  onQuizDeleteError
) => {
  return (dispatch) => {
    axios({
      method: "delete",
      url: `${URL.khbaseUrl}quiz/deleteOption`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: paramsQuiz,
    })
      .then((res) => {
        const quiz = res;
        console.log(res, "Delete in action");
        dispatch(deletequizQuestion(res));
        onQuizDeleteSuccess(quiz);
      })
      .catch((err) => {
        const msg = err.msg;
        console.log(err, "error messagejkasdfh");
        onQuizDeleteError(msg);
      });
  };
};
