import React, { useState } from 'react';
import Image from 'next/image';
import AudioInteractionModal from './interactionmodals/AudioInteractionModal';
import dynamic from 'next/dynamic';
const DynamicVideoImport = dynamic(() => import('./interactionmodals/VideoInteractionModal/DynamicVideoImport'), {
  ssr: false,
});
import GenericTooltip from '../../GenericTooltip';
import { useSelector } from 'react-redux';
import ArrowTooltips from '../../../modals/tooltip/Tooltip';

const EmptyInteraction = (props) => {
  const [textField, setTextField] = useState(false);
  const [value, setValue] = useState('');

  const { data } = useSelector((state) => state.sidebar);


  return (
    <div className='mt-5'>
      {textField && (
        <div className="row col-12 mx-0 mt-1 px-1">
          <div
            className="input-group py-2 bg-white rounded-pill border col-12 "
            style={{ zIndex: '999' }}
          >
            {/* <span className="input-group-text col-2 px-0 border-0 rounded-pill bg-white">
            <Image
              src="/assets/icons/new/smile.png"
              alt="smile icon"
              height="15px"
              width="15px"
            />
          </span> */}
            <input
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="border-0 light-small col-10"
              placeholder="Write a reply..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            {!value.trim() ? (
              <div className="border-0 bg-white col-2 text-end p-0 d-flex align-items-center justify-content-end">
                <Image
                  src="/assets/icons/new/sendicon.svg"
                  alt="send icon"
                  width="15px"
                  height="15px"
                  style={{ opacity: '0.5' }}
                />
              </div>
            ) : (
              <div
                className="border-0 bg-white col-2 text-end p-0 d-flex align-items-center justify-content-end"
                onClick={() => {
                  props.handleInsertComment(null, value, null, 'text');
                  props.handleInteractionData(props.playBriifId);
                  setTextField(false);
                }}
              >
                <Image src="/assets/icons/new/sendicon.svg" alt="send icon" width="15px" height="15px" />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="row text-center mt-2" >
        <div
          className={
            textField == true
              ? 'col-11 mb-2 row text-center mx-auto d-flex align-items-end justify-content-center'
              : 'col-9 mb-2 row text-center mx-auto d-flex align-items-end justify-content-center'
          }
        >

          <div
            className={textField == false ? 'col-3 p-0 pe-auto' : 'col-2 p-0 pe-auto'}
          >
            <ArrowTooltips title="Video Comment" placement="top">
              <div>
                <Image
                  src="/assets/icons/ic_video.svg"
                  alt="video icon"
                  width="30px"
                  height="30px"
                  onClick={() => {
                    props.handleVideoOpen();
                  }}
                />
              </div>
            </ArrowTooltips>
            {props.videoOpen == true ? (
              <DynamicVideoImport
                videoOpen={props.videoOpen}
                setInteractionsLoading={props.setInteractionsLoading}
                interactionsLoading={props.interactionsLoading}
                uploadFileInput={props.uploadFileInput}
                handleVideoClose={props.handleVideoClose}
                handleInteractionData={props.handleInteractionData}
                playBriifId={props.playBriifId}
                handleInsertComment={props.handleInsertComment}
              />
            ) : (
              ''
            )}
          </div>
          <div className={textField == false ? 'col-3 p-0' : 'col-2 p-0'}>
            <ArrowTooltips title="Audio Comment" placement="top">
              <div>
                <Image
                  src="/assets/icons/ic_audio.svg"
                  alt="audio icon"
                  height="30px"
                  width="30px"
                  onClick={props.handleAudioOpen}
                />
              </div>
            </ArrowTooltips>

            <AudioInteractionModal
              audioOpen={props.audioOpen}
              handleAudioClose={props.handleAudioClose}
              // uploadFile={props.uploadFile}
              setInteractionsLoading={props.setInteractionsLoading}
              interactionsLoading={props.interactionsLoading}
              uploadFileInput={props.uploadFileInput}
              handleInteractionData={props.handleInteractionData}
              playBriifId={props.playBriifId}
              handleInsertComment={props.handleInsertComment}
            />
          </div>
          <div className={textField == false ? 'col-3 p-0' : 'col-2 p-0'}>
            <ArrowTooltips title="Document Comment" placement="top">
              <label htmlFor='uploadDoc'>
                <Image
                  src="/assets/icons/textImage.png"
                  alt="audio icon"
                  height="30px"
                  width="30px"
                />
              </label>
            </ArrowTooltips>
            <input
              id="uploadDoc"
              type="file"
              name="file_upload"
              accept="image/png, image/jpeg, image/jpg, image/gif, .pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.mp4,.webm"
              style={{ display: 'none' }}
              onChange={(e) => {
                props.handleFileUpload(e);
              }}
            />
          </div>
          {textField == false ? (
            <div className={textField == false ? 'col-3 p-0' : 'col-2 p-0'}>
              <ArrowTooltips title="Text Comment" placement="top">
                <div>
                  <Image
                    src="/assets/icons/ic_text.svg"
                    alt="text icon"
                    height="30px"
                    width="30px"
                    onClick={() => {
                      setTextField(!textField);
                    }}
                  />
                </div>
              </ArrowTooltips>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="row mx-auto d-flex justify-content-center text-center" style={{ height: '60px' }}>
        <div className="col-12 regular-xsmall">Start interacting by selecting one of the options</div>
      </div>
    </div>
  );
};

export default EmptyInteraction;
