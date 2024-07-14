import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';
import { END_CONFERENCE } from './types';

const endMeetingHandler = (end_res) => {
  return { type: END_CONFERENCE, payload: end_res };
};

const EndConference = (params, onEndMeetingSuccess, onEndMeetingError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/end`,
      'post',
      params,
      (res) => {
        onEndMeetingSuccess(res.data);
        dispatch(endMeetingHandler(res.data));
      },
      (err) => {
        onEndMeetingError(err);
      },
    );
  };
};

export default EndConference;
