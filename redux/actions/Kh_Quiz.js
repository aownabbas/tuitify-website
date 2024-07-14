import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { KH_Quiz } from './types';

const fetchQuizData = (quiz) => {
  return {
    type: KH_Quiz,
    payload: quiz,
  };
};

const KH_CreateQuiz = (paramsQuiz, token, onQuizSubmitSuccessTimer, onQuizSubmitErrorTimer) => {
  return async (dispatch) => {
    console.log(paramsQuiz, 'paramsQuize in action');
    await GlobalApiCall(
      `${URL.khbaseUrl}UpdateGiist`,
      'put',
      paramsQuiz,
      (res) => {
        const quiz = res.data;
        console.log(quiz, 'quiz in action');
        dispatch(fetchQuizData(quiz));
        onQuizSubmitSuccessTimer(quiz);
      },
      (err) => {
        const msg = err.msg;
        console.log(err, 'error messagejkasdfh');
        onQuizSubmitErrorTimer(msg);
      },
    );
    // axios
    //   .put(`${URL.khbaseUrl}UpdateGiist`, paramsQuiz, {
    //     method: "put",
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const quiz = res.data;
    //     console.log(quiz, "quiz in action");
    //     dispatch(fetchQuizData(quiz));
    //     onQuizSubmitErrorTimer(quiz);
    //   })
    //   .catch((err) => {
    //     const msg = err.msg;
    //     console.log(err, "error messagejkasdfh");
    //     onQuizSubmitError(msg);
    //   });
  };
};

export default KH_CreateQuiz;
