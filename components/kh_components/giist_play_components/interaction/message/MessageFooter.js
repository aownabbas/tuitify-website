import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { ReactionOnComment } from '../../../../../redux/actions/giist_comments/LoadComments';

const MessageFooter = (props) => {
  const dispatch = useDispatch();

  const handleReactions = (comment_id, giist_id, value) => {
    const params = {
      comment_id: comment_id,
      tutorial_id: giist_id,
      status: String(value),
    };
    dispatch(ReactionOnComment(params));
  };

  return (
    <>
      {props.editTextMessage == true ? (
        ''
      ) : (
        <div className="d-flex justify-content-evenly h-100 align-items-end pe-1 ">
          <div className="pe-1 d-flex align-items-center pe-2">
            <Image
              src={props.likedByMe == 0 ? '/assets/icons/new/like-outlined.svg' : '/assets/icons/new/like-filled.svg'}
              width={props.likedByMe == 0 ? '20px' : '20px'}
              height="20px"
              alt="like"
              onClick={() => {
                handleReactions(props.id, props.giist_id, 0);
              }}
            />
            <p className="d-inline m-0 px-1">
              <small>{props.likes}</small>
            </p>
          </div>
          <div className="pe-1 d-flex align-items-center pe-2">
            <Image
              src={props.ideaByMe == 0 ? '/assets/icons/new/idea-outlined.svg' : '/assets/icons/new/idea-filled.svg'}
              width={props.ideaByMe == 0 ? '20px' : '20px'}
              height="20px"
              alt="idea"
              onClick={() => {
                handleReactions(props.id, props.giist_id, 1);
              }}
            />
            <p className="d-inline m-0 px-1">
              <small>{props.idea}</small>
            </p>
          </div>
          <div className="pe-1 d-flex align-items-center pe-2">
            <Image
              src={
                props.celebrationByMe == 0
                  ? '/assets/icons/new/celebrate-outlined.svg'
                  : '/assets/icons/new/celebrate-filled.svg'
              }
              width={props.celebrationByMe == 0 ? '20px' : '20px'}
              height="20px"
              alt="celebration"
              onClick={() => {
                handleReactions(props.id, props.giist_id, 2);
              }}
            />
            <p className="d-inline m-0 px-1">
              <small>{props.celebration}</small>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageFooter;
