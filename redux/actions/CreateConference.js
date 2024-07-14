import React from 'react';
import { URL } from '../../public/assets/path/path';
import { CREATE_WEB_CONFERENCE } from './types';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchConferenceCreateData = (get_conference_data) => {
  console.log(get_conference_data, 'conference data action');
  return {
    type: CREATE_WEB_CONFERENCE,
    payload: get_conference_data,
  };
};

export const CreateConference = (params, onConferenceSuccess, onConferenceError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/create`,
      'post',
      params,
      (response) => {
        const get_conference_data = response.data;
        console.log(get_conference_data, 'conference res action');
        dispatch(fetchConferenceCreateData(get_conference_data));
        onConferenceSuccess(response.data);
      },
      (error) => {
        const errormsg = error.message;
        onConferenceError(errormsg);
      },
    );
    console.log(params, 'this is params');
  };
};
