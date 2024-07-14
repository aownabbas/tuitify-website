import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { CREATE_GIIST_CHAPTER } from './types';

// dispatching methods inside action
const chapterCreation = (data) => {
  return {
    // defining what type of action it is.
    type: CREATE_GIIST_CHAPTER,
    payload: data,
  };
};

const CreateChaps = (paramsBody, token, onCreateChapterSuccess, onCreateChapterError) => {
  // const bodyData = JSON.stringify({
  //   id: paramsBody.id,
  //   chapter: {
  //     chapter_id: paramsBody.chapter.chapter_id,
  //     title: paramsBody.chapter.title,
  //   },
  // });

  console.log(paramsBody, 'the param data');
  return async (dispatch) => {
    /** this api is to update but here is used to create chapters (without id) */
    // https://khdev.tuitify.com/updateGiist

    await GlobalApiCall(
      `${URL.khbaseUrl}updateGiist`,
      'put',
      paramsBody,
      (res) => {
        dispatch(chapterCreation(res.data));
        console.log(res, 'res in action');
        onCreateChapterSuccess(res.data);
      },
      (err) => {
        console.log(err, 'res in action');
        onCreateChapterError(err);
      },
    );

    // axios
    //   .put(`${URL.khbaseUrl}updateGiist`, paramsBody, {
    //     method: 'put',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     dispatch(chapterCreation(res.data));
    //     console.log(res, 'res in action')
    //     onCreateChapterSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err, 'res in action')
    //     onCreateChapterError(err);
    //   });
  };
};

export default CreateChaps;
