import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { CREATE_GIIST_CHAPTER_MEDIA } from './types';

// dispatching methods inside action
const chapterMediaCreation = (data) => {
  return {
    type: CREATE_GIIST_CHAPTER_MEDIA,
    payload: data,
  };
};

/**
  axios
      .put(`${URL.khbaseUrl}updateGiist`, paramsBody, {
        uploadedProgress: data=>{
          console.log(data.loaded, data.total);
        },
      },{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
 

 */

const CreateChapsMedia = (paramsBody, token, onCreateChapterMediaSuccess, onCreateChapterMediaError) => {
  console.log(paramsBody, 'parameters of media chapters');
  return async (dispatch) => {
    /** this api is to update but here is used to create chapters (without id) */
    // https://khdev.tuitify.com/updateGiist

    await GlobalApiCall(
      `${URL.khbaseUrl}updateGiist`,
      'put',
      paramsBody,
      (res) => {
        console.log(res.data, 'action response');
        dispatch(chapterMediaCreation(res.data));
        onCreateChapterMediaSuccess(res.data);
      },
      (err) => {
        onCreateChapterMediaError(err);
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
    //     console.log(res.data, 'action response');
    //     dispatch(chapterMediaCreation(res.data));
    //     onCreateChapterMediaSuccess(res.data);
    //   })
    //   .catch((err) => {
    //     onCreateChapterMediaError(err);
    //   });
  };
};

export default CreateChapsMedia;
