import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';

// forward selected groups briif action displayed.
const forwardSelectedGroupsBriif = (params, onForwardSelectedGroupsBriifSuccess, onForwardSelectedGroupsBriifError) => {
  return (dispatch) => {
    // hitting API. This api is used for forwarding a briif to groups.
    axios
      .post(`${URL.khbaseUrl}forward?${params}`)

      // getting API response.
      .then((res) => {
        // if response true then dispatching action.
        dispatch(userForwardSelectedGroupsBriif(res));
        // returning response to the success function.
        onForwardSelectedGroupsBriifSuccess(res);
      })
      .catch((err) => {
        // if response false then returning response to the error function.
        onForwardSelectedGroupsBriifError(err);
      });
  };
};

// dispatching methods inside action
const userForwardSelectedGroupsBriif = (data) => {
  return {
    // defining what type of action it is.
    type: types.FORWARD_SELECTED_GROUPS_BRIIF,
    payload: data,
  };
};
export default forwardSelectedGroupsBriif;
