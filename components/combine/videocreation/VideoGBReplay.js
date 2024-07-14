import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../components/ch/briifrecording/videocreation/VideoCreation.module.scss';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import AlertModal from '../../../components/modals/alertmodal/AlertModal';
//uploading ki imports
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import SuccessErrorModal from '../../modals/successErrormodal/SuccessErrorModal';
import DotProgress from '../../DotProgress';
import PrimaryMediaPlayer from '../mediaPlayer/PrimaryMediaPlayer';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';

const VideoGBReplay = ({
  isWebcamActive,
  setIsWebcamActive,
  platformData,
  S3_BUCKET,
  REGION,
  AccessKeyId,
  SecretAccessKey,
  name,
  type,
  seconds,
  recording,
  giistChapMediaCreate,
  giistSubChapMediaCreate,
  setUploadedBlobData,
  indexForMedia,
  subindexForMedia,
  setDotProgressLoading,
  DotProgressLoading,
  duration,
  chaptersCreateRes,
  transcodePresetId,
  TranscodePipelineId,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vid, setVid] = useState();

  const [backModal, setBackModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [playing, setPlaying] = useState(true);

  //   modal for success or error
  const [openSuccessErrorModal, setOpenSuccessErrorModal] = useState(false);
  const handleOpenSEmodal = () => setOpenSuccessErrorModal(true);
  const handleCloseSEmodal = () => setOpenSuccessErrorModal(false);

  const isSafari =
    typeof window != 'undefined' &&
    (/constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)));

  useEffect(() => {
    console.log(name, 'dont know about name');
    // start the screen loading.
    const handleStart = (url) => url !== router.asPath && setLoading(true);

    // stop the screen loading.
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    // check what is the state of the route.
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      // destroying the events after they complete.
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events, router.asPath]);

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
    let randomName = makeId(20);
    let fileFormat = '';
    let keyPrefix = '';
    let dirName = '';
    let platform_name = '';
    let api_extension = '';
    let quality = '';

    if (type == 'mp4' && isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'camvideo';
      dirName = 'temp/';
      // change temp folder and change extension webm to mp4
      quality = '_720p';
      platform_name = getPlatData.name + '_';
      api_extension = '.mp4';
    } else if (type == 'mp4' && !isSafari) {
      fileFormat = '.mp4';
      keyPrefix = 'camvideo';
      // change temp folder and change extension webm to mp4
      quality = '_720p';
      dirName = 'temp/';
      platform_name = platformData.name + '_';
      api_extension = '.mp4';
    }

    let data = {
      name: keyPrefix + randomName + quality + fileFormat,
      url: name,
      recording: keyPrefix,
      type: fileFormat,
      link: dirName + keyPrefix + randomName + quality + api_extension,
      fileDBName: keyPrefix + randomName,
    };
    setUploadedBlobData(data.name);
    return data;
  };

  const uploadFileInput = () => {
    const data = filenameChanger(name);
    fetch(name)
      .then((response) => response.blob())
      .then((blob) => {
        const blobFile = new File([blob], data.name, {
          type: blob.type,
          size: blob.size,
        });
        uploadFile(blobFile, seconds, data);
      })
      .catch((e) => {
        <SuccessErrorModal open={openSuccessErrorModal} handleCloseMediaplay={handleCloseSEmodal} blobError={e} />;
      });
  };
  const uploadFile = (file, seconds, data) => {
    setDotProgressLoading(true);
    let target = {};

    target = { Bucket: S3_BUCKET, Key: data.link, Body: file };
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
        const transcoder = new ElasticTranscoder({
          region: REGION,
          credentials: {
            accessKeyId: AccessKeyId,
            secretAccessKey: SecretAccessKey,
          },
        });

        const input = {
          PipelineId: TranscodePipelineId,
          OutputKeyPrefix: 'giists/video/',
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
          console.log(response, 'response job complete');
          const readJOb = new ReadJobCommand({
            Id: response.Job.Id,
          });
          let intervalId = setInterval(async () => {
            let readResponse = await transcoder.send(readJOb);
            console.log(readResponse, 'read response here');
            if (readResponse.Job.Status == 'Complete') {
              clearInterval(intervalId);
              if (!chaptersCreateRes?.data?.chapters[indexForMedia].subChapters.length) {
                giistChapMediaCreate(indexForMedia, data?.name, duration, null, 1, 0);
              } else {
                giistSubChapMediaCreate(indexForMedia, subindexForMedia, data?.name, duration, null, 1, 0);
              }
              setIsWebcamActive(false);
            }
          }, 1000);
        }
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e, 'Something went wrong');
      <SuccessErrorModal open={openSuccessErrorModal} handleCloseMediaplay={handleCloseSEmodal} blobError={e} />;
    }
  };

  return (
    <>
      {deleteModal == true && (
        <>
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
            isWebcamActive={isWebcamActive}
            setIsWebcamActive={setIsWebcamActive}
            title="Delete"
            description="Are you sure, you want to delete this Audio recording?"
            button1="Cancel"
            button2="Delete"
            recording={recording}
          />
        </>
      )}
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
            isWebcamActive={isWebcamActive}
            setIsWebcamActive={setIsWebcamActive}
            title="Exit"
            description="You are about to loose your recording, do you confirm?"
            button1="Cancel"
            button2="Yes"
            recording={recording}
          />
        </>
      )}
      {openSuccessErrorModal == true && (
        <SuccessErrorModal open={openSuccessErrorModal} handleCloseMediaplay={handleCloseSEmodal} />
      )}
      {loading == true ? (
        <div className="d-flex align-items-center justify-content-center alignCenter">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          <div className="col-12 justify-content-center row w-100 mx-auto px-0 h-100">
            {/* { device == true ? */}
            <div className="position-absolute px-0 h-100">
              <div className={`${styles.title} position-relative w-75 mx-auto h-100`}>
                {DotProgressLoading == true && <DotProgress dotColor={'grey'} />}
                <div
                  className="h3 pt-3 row mb-0 px-4 w-100 d-inline-flex align-items-center position-absolute"
                  style={{ zIndex: '1' }}
                >
                  <span className="col-6">
                    <span className="d-flex align-items-center justify-content-start">
                      <Image
                        onClick={() => {
                          setBackModal(true);
                        }}
                        src="/assets/icons/new/back.png"
                        width="17px"
                        height="17px"
                        className=""
                        alt="back"
                      />
                      <span className="semibold-large white ps-3">Recording</span>
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
                        setDotProgressLoading(true);
                        uploadFileInput();
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
                <span className={`${styles.videoReplayContainer}`}>
                  <div
                    data-vjs-player
                    className="m-0 w-100"
                    style={{
                      borderRadius: '10px',
                      // border: '1px solid black',
                      // height: '100%',
                      // background: 'red',
                    }}
                  >
                    <PrimaryMediaPlayer
                      link={name}
                      platformData={platformData}
                      time={duration}
                      playing={playing}
                      setPlaying={setPlaying}
                    />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideoGBReplay;
