import axios from 'axios';
import { FETCH_INTERACTIONS_TYPE, FETCH_INTERACTIONS_TYPE_LOADING } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
const ActionInteractionsType = (params, token) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: FETCH_INTERACTIONS_TYPE_LOADING,
      });
      await GlobalApiCall(
        `${URL.khbaseUrl}get_chs?${params}`,
        'get',
        {},
        (response) => {
          console.log(response, 'interactions');
          if (response.data.status == true) {
            dispatch({
              type: FETCH_INTERACTIONS_TYPE,
              payload: response.data.user_interaction_detail,
            });
          } else {
            alert('error in fetching InteractionDetail ');
          }
        },
        (error) => {
          const errormsg = error.message;
        },
      );
      // await axios.get(`${URL.khbaseUrl}get_chs?${params}`, {
      //     method: 'GET',
      //     headers: { Authorization: `Bearer ${token}` },})
      // .then(response=>{
      //     console.log(response,"interactions")
      //     if(response.data.status ==true){
      //         dispatch({
      //             type:FETCH_INTERACTIONS_TYPE,
      //             payload:response.data.user_interaction_detail,
      //         })

      //     }else{
      //         alert("error in fetching InteractionDetail ")

      //     }
      // }).catch(error=>{
      //     const errormsg=error.message
      // })
    } catch (error) {
      console.log(error);
    }
  };
};
export default ActionInteractionsType;
