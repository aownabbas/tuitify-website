import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { PEOPLE_JOIN_CONFERENE } from './types';

export const joiningPeople = (join_people) => {
  console.log(join_people, 'conference data action');
  return {
    type: PEOPLE_JOIN_CONFERENE,
    payload: join_people,
  };
};

export const JoinMeeting = (channelParams, onJoinPopleSuccess, onJoinPopleError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/join?channel=${channelParams}`,
      'get',
      {},
      (response) => {
        const join_people = response.data;
        console.log(join_people, 'conference res action');
        dispatch(joiningPeople(join_people));
        onJoinPopleSuccess(response.data);
      },
      (error) => {
        const errormsg = error.message;
        onJoinPopleError(errormsg);
      },
    );
  };
};
