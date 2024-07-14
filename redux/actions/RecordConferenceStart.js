import { GlobalApiCall } from '../GlobalApiCall';
import { URL } from '../../public/assets/path/path';
import { START_CONFERENCE_RECORDING,STOP_CONFERENCE_RECORDING } from './types';

const getRecording = (rec_res) => {
  return { type: START_CONFERENCE_RECORDING, payload: rec_res };
};

export const RecordConferenceStart = (params, onRecordingStartSuccess, onRecordingStartError) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}conference/recording/start`,
      'put',
      params,
      (res) => {
        console.log(res,"respo")
        onRecordingStartSuccess(res.data);
        dispatch(getRecording(res.data));
      },
      (err) => {
        onRecordingStartError(err);
      },
    );
  };
};

export const RecordConferenceStop =()=>{
  return {type: STOP_CONFERENCE_RECORDING}
}
