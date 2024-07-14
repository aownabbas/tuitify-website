import React, { useState } from "react";
import AudioInteractionModal from "./interactionmodals/AudioInteractionModal";
import dynamic from "next/dynamic";
const DynamicVideoImport = dynamic(
  () => import("./interactionmodals/VideoInteractionModal/DynamicVideoImport"),
  {
    ssr: true,
  }
);
import Image from "next/image";
import GenericTooltip from "../../GenericTooltip";
import SuccessModal from "../../../modals/simplemodal/SuccessModal";
import { useEffect } from "react";
import ArrowTooltips from "../../../modals/tooltip/Tooltip";

const InteractionFooter = (props) => {
  const { value, setValue, textField, setTextField } = props;

  const [modalInput, setmodalInput] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!value.trim()) {
      return setmodalInput(true);
    } else {
      props.handleInsertComment(null, value, null, "text");
      props.handleInteractionData(props.playBriifId);
      setTextField(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setmodalInput(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [modalInput]);

  return (
    <div
      className=" d-flex flex-column justify-content-center m-0 align-items-center p-0 mx-auto w-100 interaction-footer p-2"
      style={{ borderRadius: "20px", }}
    >
      {textField && (
        <div className="row col-12 mx-0 px-1 position-relative">
          <div
            className="input-group py-2 bg-white rounded-pill border col-12 position-sticky"
            style={{ zIndex: "" }}
          >
            <input
              type="text"
              onChange={(e) => {
                console.log(e.target.value);
                setValue(e.target.value);
              }}
              className="border-0 light-small col-10"
              placeholder="  Write a reply..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <div
              className="border-0 bg-white col-2 text-end p-0 d-flex align-items-center justify-content-end"
              onClick={() => handleSend()}
            >
              <Image
                src="/assets/icons/new/sendicon.svg"
                alt="send icon"
                width="15px"
                height="15px"
              />
            </div>
          </div>
        </div>
      )}
      <div className="col-12 row d-flex mt-2 align-items-center justify-content-center text-center">

        <div
          className={
            textField == false
              ? "col-3 border-0 px-1 position-relative"
              : "col-2 border-0 px-1 position-relative"
          }
          style={{ background: "transparent" }}
        >
          <ArrowTooltips title="Video Comment" placement="top">
            <div >
              <Image
                src="/assets/icons/ic_video.svg"
                width="30px"
                height="30px"
                alt="video icon"
                style={{ zIndex: "" }}
                onClick={props.handleVideoOpen}
              />
            </div>
          </ArrowTooltips>

          {props.videoOpen == true && (
            <DynamicVideoImport
              handleInsertComment={props.handleInsertComment}
              videoOpen={props.videoOpen}
              setInteractionsLoading={props.setInteractionsLoading}
              interactionsLoading={props.interactionsLoading}
              uploadFileInput={props.uploadFileInput}
              handleVideoClose={props.handleVideoClose}
              handleInteractionData={props.handleInteractionData}
              playBriifId={props.playBriifId}
            />
          )}
        </div>
        <div
          className={
            textField == false
              ? "col-3 border-0 px-1 position-relative"
              : "col-2 border-0 px-1 position-relative"
          }
          style={{ background: "transparent" }}
        >
          <ArrowTooltips title="Audio Comment" placement="top">
            <div >
              <Image
                src="/assets/icons/ic_audio.svg"
                alt="audio icon"
                style={{ zIndex: "" }}
                width="30px"
                height="30px"
                onClick={props.handleAudioOpen}
              />
            </div>
          </ArrowTooltips>
          {props.audioOpen == true &&
            <AudioInteractionModal
              handleInsertComment={props.handleInsertComment}
              audioOpen={props.audioOpen}
              setInteractionsLoading={props.setInteractionsLoading}
              interactionsLoading={props.interactionsLoading}
              uploadFileInput={props.uploadFileInput}
              handleAudioClose={props.handleAudioClose}
              handleInteractionData={props.handleInteractionData}
              playBriifId={props.playBriifId}
            />
          }

        </div>
        {textField == false ? (
          <button
            className={
              textField == false
                ? "col-3 border-0 px-1 position-relative"
                : "col-2 border-0 px-1 position-relative"
            }
            style={{ background: "transparent" }}
          >
            <ArrowTooltips title="Text Comment" placement="top">
              <div >
                <Image
                  src="/assets/icons/ic_text.svg"
                  alt="text icon"
                  width="30px"
                  style={{ zIndex: "" }}
                  height="30px"
                  onClick={() => {
                    setTextField(!textField);
                  }}
                />
              </div>
            </ArrowTooltips>
            {/* <GenericTooltip
              placement="top"
              title="Text Comment"
              component={
                <Image
                  src="/assets/icons/ic_text.svg"
                  alt="text icon"
                  width="40px"
                  style={{ zIndex: "" }}
                  height="40px"
                  onClick={() => {
                    setTextField(!textField);
                  }}
                />
              }
            /> */}
          </button>
        ) : (
          ""
        )}
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
      </div>
      {modalInput == true && (
        <SuccessModal
          modalOpen={modalInput}
          handleModalClose={() => setmodalInput(false)}
          image={
            <Image
              src={"/assets/icons/danger.svg"}
              width="65px"
              height="70px"
              alt="alert"
            />
          }
          title={"Something Wrong"}
          description={"Please enter a text, Let's give it another try"}
          button1={"Okay"}
          setDotProgressLoading={setLoading}
          giistPublishMove={false}
        />
      )}
    </div>
  );
};

export default InteractionFooter;
