import axios from 'axios';
import * as types from './types';

// accessing the URL variable from the path.js file located in assets folder. import for base url.
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

// login action displayed.
const login = (params, onLoginSuccess, onLoginError) => {
  return async (dispatch) => {
    // hitting API. This api is used for login in in to the web.

    await GlobalApiCall(
      `${URL.khbaseUrl}getlogin`,
      'post',
      params,
      (res) => {
        const response = res.data;
        // if response true then dispatching action.
        dispatch(userLogin(response.user[0]));
        // returning response to the success function.
        onLoginSuccess(res);
        if (response) {
          if (response.status == 'true') {
            // if api responses status true then this code will run.
            // getting the user in x variable.
            let x = response.user[0];
            console.log('xsskl', x);
            // getting the user in y variable except for password key and value.
            let { password, ...y } = x;
            // setting login data in local storage.
            localStorage.setItem('@LoginData', JSON.stringify(y));
            const login_data = localStorage.getItem('@LoginData');
          }
        }
        if (response.status == 'false') {
          // if api responses status false then this code will run.
          onLoginError(response.message);
        }
      },
      (err) => {
        // if response false then returning response to the error function.
        onLoginError(err);
      },
    );
  };
};

export const handleLogout = (params, onLoginSuccess, onLoginError) => {
  return async (dispatch) => {
    // hitting API. This api is used for login in in to the web.
    await GlobalApiCall(
      `${URL.khbaseUrl}getlogout?${params}`,
      'post',
      {},
      (res) => {
        // if response true then dispatching action.
        dispatch(userLogout(res));
        // returning response to the success function.
        onLoginSuccess(res);
      },
      (err) => {
        // if response false then returning response to the error function.
        onLoginError(err);
      },
    );
  };
};

// dispatching methods inside action
const userLogin = (data) => {
  return {
    // defining what type of action it is.
    type: types.LOGIN,
    payload: data,
  };
};
const userLogout = (data) => {
  return {
    // defining what type of action it is.
    type: types.LOGOUT_USER,
    payload: data,
  };
};
export default login;
