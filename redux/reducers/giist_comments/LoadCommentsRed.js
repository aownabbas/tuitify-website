/**
 *  // return console.log('giist post commment reducer');
      // append instead of push ===> remove last element on bases of length from array
      // old data getting,
      // new index pushed in old data
      // upload old data with new data
      // increase total items' state
      // page => will be resolved from 1st
 * 
 */

import {
  CLEAR_COMMENTS,
  DELETING_COMMENT,
  FETCH_DATA_LOADING,
  FETCH_PARTIAL_DATA_LOADING,
  GIIST_COMMENT_REACTION,
  GIIST_EDIT_COMMENT,
  GIIST_POST_COMMENT,
  LOAD_ALL_COMMENTS,
} from '../../actions/types';

let initialState = {
  items: [],
  totalItems: 0,
  page: 1,
  loading: false,
  loading_partial: false,
  comment_id: undefined,
  comment: '',
};

const CommentsRed = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_LOADING:
      return { ...state, loading: true };

    case FETCH_PARTIAL_DATA_LOADING:
      return { ...state, loading_partial: true };

    case CLEAR_COMMENTS:
      return {
        items: [],
        totalItems: 0,
        page: 1,
        loading: false,
        loading_partial: false,
        comment_id: undefined,
        comment: '',
      };

    case LOAD_ALL_COMMENTS:
      // const newItems = action.payload?.data?.items;
      // const existingItems = state.items;
      // const uniqueNewItems = newItems.filter(
      //   (newItem) => !existingItems.some((existingItem) => existingItem.id === newItem.id),
      // );

      // const mergedItems = [...existingItems, ...uniqueNewItems];

      const newItems = action.payload?.data?.items;
      const existingItems = state.items;
      // Create a set to hold the unique items
      const uniqueItems = new Set([...existingItems, ...newItems]);
      // Convert the set back to an array
      const mergedItems = Array.from(uniqueItems);

      console.log(action.payload?.data?.nextPage, 'the page in state');

      return {
        ...state,
        items: mergedItems,
        totalItems: action.payload?.data?.totalItems,
        page: action.payload?.data?.nextPage,
        loading: false,
      };
    // return {
    //   ...state,
    //   items: state.items.concat(action.payload?.data?.items),
    //   totalItems: action.payload?.data?.totalItems,
    //   page: action.payload?.data?.nextPage,
    //   loading: false,
    // };

    case GIIST_POST_COMMENT:
      console.log(action.payload?.data?.data, 'action.payload?.data?.data');
      const insertedComment = [...state.items];
      insertedComment.unshift(action.payload?.data?.data);
      return {
        ...state,
        items: insertedComment,
        totalItems: state.totalItems + 1,
        page: state.page,
        loading: false,
      };

    case GIIST_EDIT_COMMENT:
      console.log(action.payload, 'action.payload edit');
      const { commentData } = action.payload;
      const editElement = state.items.map((item) => {
        if (item.comment_id === commentData?.id) {
          return {
            ...item,
            comment: commentData?.type == '3' ? commentData?.comment : item.comment,
            commentId: commentData?.id,
          };
        }
        return item;
      });
      return {
        ...state,
        items: editElement,
        totalItems: state.totalItems,
        page: state.page,
        loading_partial: false,
        // loading: false,
      };

    case DELETING_COMMENT:
      const newList = state.items.filter((item) => item.comment_id != action.payload.delId);
      const nextComment = action.payload?.delResponse.data?.nextComment;
      if (nextComment !== undefined) {
        newList[newList.length] = nextComment;
      }
      console.log(newList == undefined, 'new arraynewList');
      console.log(action.payload?.delId, 'action.payload?.delId');
      console.log(action.payload?.delResponse.data?.nextComment, 'new array list');

      return {
        ...state,
        items: newList,
        totalItems: state.totalItems - 1,
        loading: false,
      };

    case GIIST_COMMENT_REACTION:
      const { commentId, statusType, dataLike } = action.payload || {};
      console.log(dataLike, 'for like 123');
      console.log(state, 'for like state');
      const updatedItems = state.items.map((item) => {
        if (item.comment_id === commentId) {
          const isLikedByMe = item.likedbyme === 1;
          const isCelebratedByMe = item.likedbycelebration === 1;
          const isIdeaByMe = item.likedbyidea === 1;
          let likes = item.likes;
          let celebrations = item.celebrations;
          let ideas = item.ideas;
          let likedbyme = item.likedbyme;
          let likedbycelebration = item.likedbycelebration;
          let likedbyidea = item.likedbyidea;
          if (statusType === '0') {
            // like reaction
            likes = isLikedByMe ? likes - 1 : likes + 1;
            likedbyme = isLikedByMe ? 0 : 1;
            celebrations = isCelebratedByMe ? celebrations - 1 : celebrations;
            likedbycelebration = isCelebratedByMe ? 0 : likedbycelebration;
            ideas = isIdeaByMe ? ideas - 1 : ideas;
            likedbyidea = isIdeaByMe ? 0 : likedbyidea;
          } else if (statusType === '2') {
            // celebration reaction
            likes = isLikedByMe ? likes - 1 : likes;
            likedbyme = isLikedByMe ? 0 : likedbyme;
            celebrations = isCelebratedByMe ? celebrations - 1 : celebrations + 1;
            likedbycelebration = isCelebratedByMe ? 0 : 1;
            ideas = isIdeaByMe ? ideas - 1 : ideas;
            likedbyidea = isIdeaByMe ? 0 : likedbyidea;
          } else if (statusType === '1') {
            // idea reaction
            likes = isLikedByMe ? likes - 1 : likes;
            likedbyme = isLikedByMe ? 0 : likedbyme;
            celebrations = isCelebratedByMe ? celebrations - 1 : celebrations;
            likedbycelebration = isCelebratedByMe ? 0 : likedbycelebration;
            ideas = isIdeaByMe ? ideas - 1 : ideas + 1;
            likedbyidea = isIdeaByMe ? 0 : 1;
          }
          // make API call here with updated reaction state
          return {
            ...item,
            likes,
            celebrations,
            ideas,
            likedbyme,
            likedbycelebration,
            likedbyidea,
          };
        }
        return item;
      });
      return {
        ...state,
        comment_id: commentId,
        items: updatedItems,
        loading: false,
      };

    default:
      return state;
  }
};
export default CommentsRed;
