import axios from 'axios';
import { DRAFT_SEARCH_BRIIFS, FETCH_SEARCH_RECEIVE } from './types';
import { URL } from '../../public/assets/path/path';
import { GlobalApiCall } from '../GlobalApiCall';

export const fetchSearchReceive = (SearchReceive) => {
  return {
    type: FETCH_SEARCH_RECEIVE,
    payload: SearchReceive,
  };
};

export const fetchSearchDraftBriif = (SearchDraft) => {
  return {
    type: DRAFT_SEARCH_BRIIFS,
    payload: SearchDraft,
  };
};

export const actionSearchDraft = (params, onSuccessDraft, onErrorDraft) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}search_save?${params}`,
      'get',
      {},
      (response) => {
        const SearchDraft = response.data;
        dispatch(fetchSearchDraftBriif(SearchDraft));
        onSuccessDraft(response.data);
      },
      (error) => {
        const errormsg = error.message;
        console.log('error', errormsg);
        onErrorDraft(errormsg);
      },
    );
  };
};

const actionSearchReceive = (params, onSuccessRecived, onErrorRecived) => {
  return async (dispatch) => {
    await GlobalApiCall(
      `${URL.khbaseUrl}search_recive?${params}`,
      'get',
      {},
      (response) => {
        const SearchReceive = response.data.recive;
        dispatch(fetchSearchReceive(SearchReceive));
        onSuccessRecived(response.data);
      },
      (error) => {
        const errormsg = error.message;
        console.log('error', errormsg);
        onErrorRecived(errormsg);
      },
    );
  };
};
export default actionSearchReceive;
