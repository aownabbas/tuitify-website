import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { GIIST_CREATE_DETAIL } from './types';

export const createDetails = (create_giist_detail) => {
  return {
    type: GIIST_CREATE_DETAIL,
    payload: create_giist_detail,
  };
};

const CreateGiistDetail = (paramsBody, token, onCreateGiistDetailSuccess, onCreateGiistDetailError) => {
  // const bodyData = JSON.stringify({
  //   title: paramsBody.title,
  //   category_id: paramsBody.category_id,
  //   cme_link: paramsBody.cme_link,
  //   cme_points: paramsBody.cme_points,
  //   description: paramsBody.description,
  //   thumbnail: paramsBody.thumbnail,
  //   tags: paramsBody.tags,
  //   publisher_id: paramsBody.publisher_id,
  //   language: paramsBody.language,
  // });
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}createDraftGiist`,
      'post',
      paramsBody,
      (response) => {
        const giistCreateDetailRes = response.data;
        dispatch(createDetails(giistCreateDetailRes));
        onCreateGiistDetailSuccess(giistCreateDetailRes);
      },
      (error) => {
        const errormsg = error.message;
        onCreateGiistDetailError(errormsg);
      },
    );
    // axios
    //   .post(`${URL.khbaseUrl}createDraftGiist`, bodyData, {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     const giistCreateDetailRes = response.data;
    //     dispatch(createDetails(giistCreateDetailRes));
    //     onCreateGiistDetailSuccess(giistCreateDetailRes);
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onCreateGiistDetailError(errormsg);
    //   });
  };
};
export default CreateGiistDetail;
