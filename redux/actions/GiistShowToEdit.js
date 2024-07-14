import axios from 'axios';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { SHOW_TO_EDIT } from './types';

export const giistShowToEditPayloader = (show_to_edit) => {
  return {
    type: SHOW_TO_EDIT,
    payload: show_to_edit,
  };
};

// https://khdev.tuitify.com/editGiist?id=343
const GiistShowToEdit = (params, token, onGiistshowToEditSuccess, onGiistShowToEditError) => {
  return async (dispatch) => {
    await GlobalApiCall(`${URL.khbaseUrl}editGiist?${params}`,
    'get',
    {},
    (response) => {
      const responseToeditGiist = response;
      onGiistshowToEditSuccess(responseToeditGiist);
      dispatch(giistShowToEditPayloader(responseToeditGiist));
    },
    (error) => {
      const errormsg = error.message;
      onGiistShowToEditError(errormsg);
    },
    )
    // axios
    //   .get(`${URL.khbaseUrl}editGiist?${params}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     const responseToeditGiist = response;
    //     onGiistshowToEditSuccess(responseToeditGiist);
    //     dispatch(giistShowToEditPayloader(responseToeditGiist));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     onGiistShowToEditError(errormsg);
    //   });
  };
};
export default GiistShowToEdit;