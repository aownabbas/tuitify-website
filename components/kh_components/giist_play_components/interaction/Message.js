import React, { useState } from 'react';
// import AudioInteraction from "./message/AudioInteraction";
import dynamic from 'next/dynamic';
const GiistAudioMessage = dynamic(() => import('./message/GiistAudioMessage'), {
  ssr: false,
});
import MessageFooter from './message/MessageFooter';
import MessageHeader from './message/MessageHeader';
import GiistDocumentMessage from './message/GiistDocumentMessage';
import GiistVideoMessage from './message/GiistVideoMessage';
import GiistTextMessage from './message/GiistTextMessage';
import { Skeleton } from '@mui/material';

const Message = (props) => {
  const { fetchedDatahere } = props;

  const [editTextMessage, setEditTextMessage] = useState(false);
  const handleEditInteraction = () => { };

  const [editedId, setEditedId] = useState(null);

  return (
    <>
      <div className="row pe-0 ps-2 pt-3">
        <MessageHeader
          setComentHandler={props.setComentHandler}
          setEditTextMessage={setEditTextMessage}
          editTextMessage={editTextMessage}
          firstName={props.firstName}
          lastName={props.lastName}
          created={props.created}
          thumbnail={props.thumbnail}
          image={props.image}
          id={props.id}
          user_id={props.user_id}
          giist_id={props.giist_id}
          comment={props.comment}
          setInteractionsLoading={props.setInteractionsLoading}
          handleInteractionData={props.handleInteractionData}
          handleInteractionDelete={props.handleInteractionDelete}
          handleEditInteraction={handleEditInteraction}
          type={props.type}
          index={props.index}
          setEditedId={setEditedId}
        />
        <div className="d-flex justify-content-between py-2">
          <div style={{ width: '75%' }}>
            {props.type == '2' && <GiistDocumentMessage id={props.id} link={props.link} type={props.type == 2 && "doc"} originalName={props.originalName} />}
            {(props.type == 'mov' || props.type == 'video' || props.type == '0') && (
              <GiistVideoMessage
                id={props.id}
                lastVideoFile={props.lastVideoFile}
                image={props.image}
                link={props.link}
                duration={props.duration}
              />
            )}
            {(props.type == 'mp3' || props.type == 'audio' || props.type == '1') && (
              <GiistAudioMessage link={props.link} id={props.id} duration={props.duration} />
            )}
            {editedId == fetchedDatahere.items[props.index]?.comment_id && fetchedDatahere.loading_partial == true ? (
              <Skeleton animation="wave" height={30} width="50%" style={{ marginBottom: 3, marginLeft: '50px' }} />
            ) : (
              (props.type == 'text' || props.type == '3') && (
                <GiistTextMessage
                  setEditTextMessage={setEditTextMessage}
                  editTextMessage={editTextMessage}
                  handleEditInteraction={handleEditInteraction}
                  comment={props.comment}
                  id={props.id}
                />
              )
            )}

          </div>
          <div style={{ width: '20%' }}>
            <MessageFooter
              id={props.id}
              giist_id={props.giist_id}
              celebration={props.celebration}
              celebrationByMe={props.celebrationByMe}
              idea={props.idea}
              ideaByMe={props.ideaByMe}
              likes={props.likes}
              likedByMe={props.likedByMe}
              editTextMessage={editTextMessage}
              title={props.title}
            />
          </div>
        </div>
      </div>
      <hr className="mx-3 line my-1" />
    </>
  );
};

export default Message;
