import React from 'react';
// import AudioInteraction from "./message/AudioInteraction";
import dynamic from 'next/dynamic';
const AudioInteraction = dynamic(() => import('./message/AudioInteraction'), {
  ssr: false,
});
import MessageFooter from './message/MessageFooter';
import MessageHeader from './message/MessageHeader';
import TextInteraction from './message/TextInteraction';
import VideoInteraction from './message/VideoInteraction';
import GiistDocumentMessage from '../../../kh_components/giist_play_components/interaction/message/GiistDocumentMessage';

const Message = (props) => {
  console.log("propsdjjdjs", props)
  return (
    <>
      <div className="px-3 row">
        <div className="col-12 px-0">
          <MessageHeader
            firstName={props.firstName}
            lastName={props.lastName}
            created={props.created}
            thumbnail={props.thumbnail}
            image={props.image}
            id={props.id}
            user_id={props.user_id}
            briif_id={props.briif_id}
            setInteractionsLoading={props.setInteractionsLoading}
            handleInteractionData={props.handleInteractionData}
            handleInteractionDelete={props.handleInteractionDelete}
          />
          {props.type == 'doc' && <GiistDocumentMessage id={props.id} link={props.link} isBriif={true} type={props.type} originalName={props.originalName} />}
          {(props.type == 'mp4' || props.type == 'video') && (
            <VideoInteraction lastVideoFile={props.lastVideoFile} image={props.image} link={props.link} />
          )}
          {(props.type == 'mp3' || props.type == 'audio') && (
            <AudioInteraction audio_duration={props.audio_duration} link={props.link} />
          )}
          {props.type == 'text' && <TextInteraction message={props.message} />}
          <MessageFooter
            id={props.id}
            briif_id={props.briif_id}
            handleInteractionData={props.handleInteractionData}
            handleInteractionDelete={props.handleInteractionDelete}
            celebration={props.celebration}
            celebrationByMe={props.celebrationByMe}
            idea={props.idea}
            ideaByMe={props.ideaByMe}
            likes={props.likes}
            likedByMe={props.likedByMe}
            setBriifId={props.setBriifId}
            briifId={props.briifId}
            title={props.title}
            setInteractionsData={props.setInteractionsData}
            interactionsData={props.interactionsData}
          />
        </div>
      </div>
      <hr className="mx-3 line my-1" />
    </>
  );
};

export default Message;
