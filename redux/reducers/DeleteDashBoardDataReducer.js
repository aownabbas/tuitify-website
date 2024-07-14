import {
  DELETE_BRIIF,
  DELETE_BRIIFS,
  DELETE_COMMENTS,
  DELETE_GIIST,
  DELETE_GIIST_COMMENT,
  DELETE_INTERACTION,
  DELETE_MEETING,
} from "../actions/types";

const initialState = {
  loading: false,
  delete_giist: [],
  error: false,
};

export const deleteGiistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_GIIST:
      return {
        ...state,
        delete_giist: action.payload.res,
      };
    default:
      return state;
  }
};

const initialStates = {
  loading: false,
  delete_giist_comment: [],
  error: false,
};

export const deleteGiistsCommentReducer = (state = initialStates, action) => {
  switch (action.type) {
    case DELETE_GIIST_COMMENT:
      return {
        ...state,
        delete_giist_comment: action.payload.res,
      };
    default:
      return state;
  }
};

const initialStates3 = {
  loading: false,
  delete_briif: [],
  error: false,
};

export const deleteBriifReducer = (state = initialStates3, action) => {
  switch (action.type) {
    case DELETE_BRIIF:
      return {
        ...state,
        delete_briif: action.payload.res,
      };
    default:
      return state;
  }
};

const initialStates4 = {
  loading: false,
  delete_meeting: [],
  error: false,
};

export const deleteMeetingReducer = (state = initialStates4, action) => {
  switch (action.type) {
    case DELETE_MEETING:
      return {
        ...state,
        delete_meeting: action.payload.res,
      };
    default:
      return state;
  }
};

const initialStates5 = {
  loading: false,
  delete_briifs: [],
  error: false,
};

export const deleteBriifsReducer = (state = initialStates5, action) => {
  switch (action.type) {
    case DELETE_BRIIFS:
      return {
        ...state,
        delete_briifs: action.payload.res,
      };
    default:
      return state;
  }
};


const initialStates6 = {
  loading: false,
  delete_interaction: [],
  error: false,
};

export const deleteInteractionReducer = (state = initialStates6, action) => {
  switch (action.type) {
    case DELETE_INTERACTION:
      return {
        ...state,
        delete_interaction: action.payload.res,
      };
    default:
      return state;
  }
};

const initialStates7 = {
  loading: false,
  delete_comments: [],
  error: false,
};

export const deleteUserCommentReducer = (state = initialStates7, action) => {
  switch (action.type) {
    case DELETE_COMMENTS:
      return {
        ...state,
        delete_comments: action.payload.res,
      };
    default:
      return state;
  }
};
