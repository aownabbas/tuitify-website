import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { SENDING_INVITATION } from './types';

const sendingInvitation = (data) => {
  return {
    type: SENDING_INVITATION,
    payload: data,
  };
};

const ConferenceInvitation = (params, onSendInvitationSuccess, onSendInvitationError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/add/members`,
      'post',
      params,
      (res) => {
        dispatch(sendingInvitation(res));
        onSendInvitationSuccess(res);
      },
      (err) => {
        onSendInvitationError(err);
      },
    );
  };
};
export default ConferenceInvitation;
