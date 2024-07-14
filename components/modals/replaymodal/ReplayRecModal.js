import { Box, Modal } from '@mui/material';
import Slider from '@mui/material/Slider';
import Image from 'next/image';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from '../../../components/ch/briifrecording/videocreation/VideoCreation.module.scss';
import AlertModal from '../alertmodal/AlertModal';
import CircularProgress from '@mui/material/CircularProgress';
import DotProgress from '../../DotProgress';

//imports for uploading files
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 780,
  height: 580,
  outline: 'none',
  border: '0px',
  borderRadius: '15px',
  overflow: 'hidden',
  px: 2,
  py: 1,
};
function valuetext(value) {
  return `${value}°C`;
}

// const format = (seconds) => {
//   if (isNaN(seconds)) {
//     return '00:00';
//   }
//   const date = new Date(seconds * 1000);
//   const hh = date.getUTCHours();
//   const mm = date.getUTCMinutes().toString().padStart(2, '0');
//   const ss = date.getUTCSeconds().toString().padStart(2, '0');
//   if (hh) {
//     return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
//   }
//   return `${mm}:${ss}`;
// };

const ReplayRecModal = ({
  giistRec,
  screenModalOpen,
  screenBlobUrl,
  time,
  setScreenModalOpen,
  setBackModal,
  backModal,
  setDeleteModal,
  deleteModal,
  setVid,
  playerRef,
  state,
  setState,
  playing,
  muted,
  played,
  seeking,
  handlePlayPause,
  handleProgress,
  handleSeekChange,
  handleSeekMouseDown,
  handleSeekMouseUp,
  handleMute,
  handleRewind,
  handleFastForward,
  totalDuration,
  elapsedTime,
  S3_BUCKET,
  REGION,
  AccessKeyId,
  SecretAccessKey,
  platformData,
  giistChapMediaCreate,
  setCastedBlobData,
  giistChapterId,
  indexForMedia,
  subindexForMedia,
  giistSubChapMediaCreate,
  setDotProgressLoading,
  DotProgressLoading,
  duration,
  chaptersCreateRes,
}) => {
  console.log(setCastedBlobData, 'the url in cast replay');
  const isSafari =
    typeof window != 'undefined' &&
    (/constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)));

  //   for uploading recorded video
  const makeId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const filenameChanger = (file) => {
    const type = 'mp4';
    let randomName = makeId(20);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let platform_name = '';
    let quality = '';
    let api_extension = '';

    if (type == 'mp4' && isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'castvideo';
      dirName = 'temp/';
      platform_name = platformData?.name + '_';
      quality = '_720p';
      api_extension = '.mp4';
    } else if (type == 'mp4' && !isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'castvideo';
      dirName = 'temp/';
      platform_name = platformData?.name + '_';
      quality = '_720p';
      api_extension = '.mp4';
    }

    // giists/video/
    let data = {
      // name: keyPrefix + randomName + fileFormat, // the original one
      name: keyPrefix + randomName + quality + api_extension, // modified for transcoding
      url: screenBlobUrl,
      dirName: dirName,
      newDirectory: 'giists/video/',
      fileDBName: keyPrefix + randomName,
      recording: keyPrefix,
      type: fileFormat,
      // link: dirName + keyPrefix + randomName + api_extension,
      link: dirName + keyPrefix + randomName + quality + api_extension,
    };
    setCastedBlobData(data.name);
    console.log(data.name, 'new recorded video name');
    return data;
  };

  const uploadFileInput = () => {
    // const data = filenameChanger(props.router.query.name);
    const seconds = time;
    const data = filenameChanger(screenBlobUrl);
    // fetch(props.router.query.name)
    fetch(screenBlobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobFile = new File([blob], data.link, {
          type: blob.type,
          size: blob.size,
        });

        // uploadFile(blobFile, props.router.query.seconds, data);
        uploadFile(blobFile, seconds, data);
      })
      .catch((e) => {
        console.log(e, 'file is not uploaded');
        <SuccessErrorModal open={openSuccessErrorModal} handleCloseMediaplay={handleCloseSEmodal} blobError={e} />;
      });
  };
  const uploadFile = (file, seconds, data) => {
    let target = {};
    console.log(file);

    console.log(data, 'data.recording');

    target = { Bucket: S3_BUCKET, Key: data.link, Body: file, contentType: 'video/mp4' };

    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({
          region: REGION,
          credentials: {
            accessKeyId: AccessKeyId,
            secretAccessKey: SecretAccessKey,
          },
        }),
        partSize: 1024 * 1024 * 5000,
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on('httpUploadProgress', async (progress) => {
        if (progress) {
          const transcoder = new ElasticTranscoder({
            region: REGION,
            credentials: {
              accessKeyId: AccessKeyId,
              secretAccessKey: SecretAccessKey,
            },
          });
          const input = {
            PipelineId: '1648287878784-pg0k02', // should be placed into env file
            OutputKeyPrefix: data.newDirectory,
            Input: {
              Key: `temp/${data.name}`,
              FrameRate: 'auto',
              Resolution: 'auto',
              AspectRatio: 'auto',
              Interlaced: 'auto',
              Container: 'auto',
            },
            Outputs: [
              {
                Key: `${data.fileDBName}_720p.mp4`,
                Rotate: 'auto',
                PresetId: '1642435993031-pywc5v', //720p 1351620000001-000010
              },
              {
                Key: `${data.fileDBName}_480p.mp4`,
                Rotate: 'auto',
                PresetId: '1642436508504-uwtrsm', //480p 16:91351620000001-000020
              },

              {
                Key: `${data.fileDBName}_360p.mp4`,
                Rotate: 'auto',
                PresetId: '1642436559045-lpenoo', //360 16:91351620000001-000040
              },
            ],
          };

          const command = new CreateJobCommand(input);
          const response = await transcoder.send(command);
          if (response.Job.Status == 'Submitted') {
            const readJOb = new ReadJobCommand({
              Id: response.Job.Id,
            });
            let intervalId = setInterval(async () => {
              let readResponse = await transcoder.send(readJOb);
              console.log(readResponse, 'response transcoding');
              if (readResponse.Job.Status == 'Complete') {
                clearInterval(intervalId);
                if (!chaptersCreateRes?.data?.chapters[indexForMedia].subChapters.length) {
                  giistChapMediaCreate(indexForMedia, data?.name, duration, null, 1, 0);
                } else {
                  giistSubChapMediaCreate(indexForMedia, subindexForMedia, data.name, duration, null, 1, 0);
                }
              }
            }, 1000);
            setScreenModalOpen(false);
          }
        }
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e, 'Something went wrong');
      <SuccessErrorModal open={openSuccessErrorModal} handleCloseMediaplay={handleCloseSEmodal} blobError={e} />;
    }
  };
  return (
    <Modal
      style={{ zIndex: '1' }}
      open={screenModalOpen}
      onClose={() => setScreenModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="text-center border-0 bg-white">
        {backModal == true && (
          <>
            <AlertModal
              alertOpen={backModal}
              handleAlertClose={() => {
                setBackModal(false);
              }}
              image={
                <div className="pt-3">
                  <Image src="/assets/icons/new/exit.png" className="" alt="warning" width="80px" height="70px" />
                </div>
              }
              setScreenModalOpen={setScreenModalOpen}
              title="Exit"
              description="You are about to loose your recording, do you confirm?"
              button1="Cancel"
              button2="Yes"
              recording="screen-exit"
            />
          </>
        )}
        {deleteModal == true && (
          <AlertModal
            alertOpen={deleteModal}
            handleAlertClose={() => {
              setDeleteModal(false);
            }}
            image={
              <div className="pt-3">
                <Image src="/assets/icons/ic-trash.png" className="" alt="warning" width="60px" height="84px" />
              </div>
            }
            setScreenModalOpen={setScreenModalOpen}
            title="Delete"
            description="Are you sure, you want to delete this screen recording?"
            button1="Cancel"
            button2="Delete"
            recording="screen-exit"
          />
        )}
        <div>
          <div className="h3 row mb-0 w-100 d-inline-flex align-items-center" style={{ zIndex: '1' }}>
            <span className="col-6">
              <span className="d-flex align-items-center justify-content-start">
                <Image
                  src="/assets/icons/arrow.png"
                  width="17px"
                  height="17px"
                  className=""
                  alt="back"
                  onClick={() => {
                    setBackModal(true);
                  }}
                />
                <span className="semibold-large ps-3 ">Recording</span>
              </span>
            </span>
            <span className="col-6 d-flex justify-content-end pe-0">
              <button
                className="bg-transparent text-danger semibold me-2"
                style={{
                  width: '130px',
                  height: '42px',
                  borderRadius: '10px',
                  border: '1px solid red',
                }}
                onClick={() => {
                  setDeleteModal(true);
                }}
              >
                Delete
              </button>

              <button
                className="main-background-color text-white semibold"
                onClick={(e) => {
                  if ((giistRec = 'giist_rec')) {
                    setDotProgressLoading(true);
                    uploadFileInput();
                  } else {
                    router.push({
                      pathname: '../../../ch/RecordingForm',
                      query: {
                        name: screenBlobUrl,
                        type: `mp4`,
                        seconds: time,
                        recording: 'screen',
                      },
                    });
                  }
                }}
                style={{
                  width: '130px',
                  height: '42px',
                  borderRadius: '10px',
                  border: '2px solid #303548',
                }}
              >
                Done
              </button>
            </span>
          </div>
          <div></div>
          <div
            className={`${styles.screenReplayer} position-relative mx-auto mt-2`}
            style={{ height: '420px', width: '740px' }}
          >
            <span>
              <div
                data-vjs-player
                className="m-0 w-100 h-100"
                style={{
                  width: '1350px',
                  height: '97%',
                  borderRadius: '25px',
                }}
              >
                {DotProgressLoading == true && <DotProgress dotColor={'grey'} />}
                <ReactPlayer
                  url={screenBlobUrl}
                  ref={playerRef}
                  muted={muted}
                  onEnded={() => setVid(false)}
                  playing={playing}
                  onProgress={handleProgress}
                  className="w-100 px-0 position-absolute h-100"
                />
              </div>
            </span>
            <div
              className="bottom-0 mx-0 row mt-3"
              style={{
                backgroundColor: '#303548',
                padding: '10px',
                width: '99%',
                borderRadius: '15px',
              }}
            >
              <div className="col-1 d-flex align-items-center">
                {playing && elapsedTime != totalDuration ? (
                  <span className="mt-1">
                    <Image
                      src="/assets/icons/new/white_pause_icon.svg"
                      onClick={() => {
                        handlePlayPause();
                      }}
                      className=""
                      alt="pause"
                      width="30px"
                      height="30px"
                    />
                  </span>
                ) : (
                  <span className=" mt-1">
                    <Image
                      src="/assets/icons/new/white_play_icon.svg"
                      onClick={() => {
                        handlePlayPause();
                      }}
                      className=""
                      alt="play"
                      width="30px"
                      height="30px"
                    />
                  </span>
                )}
              </div>
              <div className="col-8 d-flex align-items-center">
                <Slider
                  getAriaValueText={valuetext}
                  min={0}
                  step={1}
                  max={1000}
                  aria-label="Default"
                  onChange={(e, value) => {
                    handleSeekChange(e, value);
                    console.log(e, value, 'vlaue');
                  }}
                  onMouseDown={handleSeekMouseDown}
                  onChangeCommitted={handleSeekMouseUp}
                  className="text-white"
                  value={state.played * 1000}
                  size="small"
                />
              </div>
              <span className="fw-lighter light-xsmall col-3 col-lg-3 px-1 text-end d-flex justify-content-between align-items-center">
                <small className="text-white text-nowrap">
                  {elapsedTime} / {totalDuration}
                </small>

                <span className="h4 mb-0 text-end align-items-center">
                  {muted ? (
                    <Image
                      onClick={handleMute}
                      src="/assets/icons/new/volume_slash.svg"
                      width="19px"
                      height="15px"
                      alt="volume"
                    />
                  ) : (
                    <Image
                      onClick={handleMute}
                      src="/assets/icons/new/ic_volume.svg"
                      width="19px"
                      height="15px"
                      alt="volume"
                    />
                  )}
                </span>
                <span className="h4 mb-0 text-end align-items-center">
                  <Image
                    onClick={handleRewind}
                    src="/assets/icons/creationicons/ic_reverse.svg"
                    width="15px"
                    height="19px"
                    alt="reverse"
                  />
                </span>
                <span className="h4 mb-0 text-center align-items-center">
                  <Image
                    onClick={handleFastForward}
                    src="/assets/icons/creationicons/ic_forward.svg"
                    width="15px"
                    height="19px"
                    alt="forward"
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ReplayRecModal;
