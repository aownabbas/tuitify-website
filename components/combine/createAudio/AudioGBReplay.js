import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import COLORS from '../../../public/assets/colors/colors';
import WaveSurfer from 'wavesurfer.js';
import moment from 'moment';
import AlertModal from '../../modals/alertmodal/AlertModal';
import GenericTooltip from '../../ch/GenericTooltip';

//uploading ki imports
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';
import DotProgress from '../../DotProgress';
import { CreateJobCommand, ElasticTranscoder, ReadJobCommand } from '@aws-sdk/client-elastic-transcoder';

const AudioGBReplay = (props) => {
  const {
    name,
    type,
    seconds,
    recording,
    isAudioRecActive,
    setIsAudioRecActive,
    S3_BUCKET,
    REGION,
    AccessKeyId,
    chaptIndex,
    SecretAccessKey,
    giistChapMediaCreate,
    setDotProgressLoading,
    DotProgressLoading,
    subindexForMedia,
    giistSubChapMediaCreate,
    chaptersCreateRes,
    setMimeType,
    TranscodePipelineId,
    transcodePresetId,
  } = props;
  const [getPlatData, setGetPlatData] = useState(null);

  const [loading, setLoading] = useState(false);

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [play, setPlay] = useState(false);
  const [durationModal, setDurationModal] = useState('');

  console.log('dutakgk =>', durationModal);

  const [duration, setDuration] = useState('');

  const [backModal, setBackModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    if (GetPlatData) {
      setGetPlatData(GetPlatData);
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      let context = new AudioContext();
      let processor = context.createScriptProcessor(1024, 1, 1);

      if (name != undefined) {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: 'grey',
          progressColor: 'white',
          backgroundColor: `transparent`,
          barWidth: 1,
          barGap: 6,
          //   autoCenter: true,
          partialRender: true,
          barHeight: 10,
          cursorWidth: 0,
          cursorColor: 'white',
          audioContext: context || null,
          audioScriptProcessor: processor || null,
          responsive: true,
          hideCursor: true,
          height: 70,
          maxCanvasWidth: 128,
          mediaControls: true,
        });

        var song = name;
        wavesurfer.current.load(song);

        wavesurfer.current.on('ready', function () {
          console.log('it is in ready');
          if (play == true) {
            wavesurfer.current.play();
            console.log('it is playing');
            let secs = wavesurfer.current.getDuration();
            const formatted = moment.utc(secs * 1000).format('mm:ss');
            setDurationModal(formatted);
            setDuration(secs);
          } else {
            wavesurfer.current.pause();
            console.log('it is pause');
            let secs = wavesurfer.current.getDuration();
            const formatted = moment.utc(secs * 1000).format('mm:ss');
            setDurationModal(formatted);
            setDuration(secs);
          }
        });

        wavesurfer.current.on('play', () => {
          console.log('it is a play event');
          let AudioContext = window.AudioContext || window.webkitAudioContext;
          context = new AudioContext();
          processor = context.createScriptProcessor(1024, 1, 1);
        });
        wavesurfer.current.on('audioprocess', () => {
          console.log('it is in audioprocess');
          let timeLeft = wavesurfer.current.getCurrentTime();
          const convert = moment.utc(timeLeft * 1000).format('mm:ss');
          setDurationModal(convert);
          setDuration(timeLeft);
          if (convert == durationModal) {
            setPlay(false);
          }
        });
      }
    }
    return () => wavesurfer.current.destroy();
  }, [play]);

  const handlePlay = () => {
    setPlay(!play);
  };

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

    if (type == 'mp3') {
      fileFormat = '.mp3';
      keyPrefix = 'audio';
      dirName = 'temp/';
      // dirName = 'giists/audio/';
      platform_name = getPlatData.name + '_';
      let quality = '';
      api_extension = '.mp3';
    }

    let data = {
      url: name,
      dirName: dirName,
      newDirectory: 'giists/audio/',
      name: keyPrefix + randomName + api_extension,
      fileDBName: keyPrefix + randomName,
      recording: keyPrefix,
      type: fileFormat,
      // link: dirName + keyPrefix + randomName + api_extension,
      link: dirName + keyPrefix + randomName + api_extension,
    };
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
        console.log(blobFile, 'blob file here');
        uploadFile(blobFile, seconds, data);
      })
      .catch((e) => {
        console.log(e, 'error in uploading audio');
      });
  };

  const uploadFile = (file, seconds, data) => {
    let target = {};

    target = { Bucket: S3_BUCKET, Key: data.link, Body: file, contentType: 'audio/mp3' };

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
          // PipelineId: '1648287878784-pg0k02', // should be placed into env file
          PipelineId: TranscodePipelineId, // should be placed into env file
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
              Key: `${data.fileDBName}.mp3`,
              // PresetId: '1351620000001-300020',
              PresetId: transcodePresetId,
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
              console.log(readResponse, 'response job read');
              if (!chaptersCreateRes?.data?.chapters[chaptIndex].subChapters.length) {
                console.log('chapter audio add');
                giistChapMediaCreate(chaptIndex, data?.name, duration, null, 5, 2);
              } else {
                giistSubChapMediaCreate(chaptIndex, subindexForMedia, data?.name, duration, null, 5, 2);
                console.log('subchapter audio add');
              }
              setIsAudioRecActive(false);
            }
          }, 1000);
        } else {
          console.log('transcoding failure');
        }

        // if (progress) {
        //   if (!chaptersCreateRes?.data?.chapters[chaptIndex].subChapters.length) {
        //     console.log('chapter audio add');
        //     giistChapMediaCreate(chaptIndex, data?.name, duration);
        //   } else {
        //     giistSubChapMediaCreate(chaptIndex, subindexForMedia, data?.name, duration);
        //     console.log('subchapter audio add');
        //   }
        // }
        console.log('progress =>', progress);
      });

      parallelUploads3.done();
    } catch (e) {
      console.log(e, 'error in uploading file audio');
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
            isAudioRecActive={isAudioRecActive}
            setIsAudioRecActive={setIsAudioRecActive}
            title="Delete"
            description="Are you sure, you want to delete this Audio recording?"
            button1="Cancel"
            button2="Delete"
            recordingGB={recording}
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
            setIsAudioRecActive={setIsAudioRecActive}
            title="Exit"
            description="You are about to loose your recording, do you confirm?"
            button1="Cancel"
            button2="Yes"
            recordingGB={recording}
          />
        </>
      )}
      {loading == true ? (
        <div className="d-flex align-items-center justify-content-center alignCenter">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          <div className="col-12 justify-content-center row w-100 mx-auto px-0 h-100">
            <div className="position-absolute px-0 h-100">
              <div
                className={`position-relative w-100 mx-auto`}
                style={{
                  height: '95%',
                  borderRadius: '15px',
                  backgroundColor: COLORS.mainColor,
                }}
              >
                {DotProgressLoading == true && <DotProgress dotColor={'grey'} />}
                <div
                  className="h3 pt-3 row mb-0 px-2 w-100 mx-auto justify-content-center d-inline-flex align-items-center position-absolute"
                  style={{ zIndex: '1' }}
                >
                  <span className="row">
                    <span className="d-flex align-items-center justify-content-start">
                      <Image
                        src="/assets/icons/new/back.png"
                        width="17px"
                        height="17px"
                        className="col-4"
                        alt="back"
                        onClick={() => {
                          setBackModal(true);
                        }}
                      />
                      <span className="semibold-large white ps-3 col-8">Recording</span>
                    </span>
                  </span>
                </div>
                <div className="position-absolute w-100 bottom-0 start-50 translate-middle-x mb-5">
                  <div className="d-flex justify-content-center pb-4">
                    <span className="d-inline-flex col-12 col-md-6 row align-items-end justify-content-center mx-auto">
                      <div className="waveform p-0 border-0 shadow-0 col-10" ref={waveformRef}></div>
                    </span>
                  </div>
                  <div className="col btn d-flex justify-content-center p-0 mt-5 pb-4">
                    <div className="text-white d-flex align-self-start bold">{durationModal}</div>
                  </div>
                  <div className="row p-0 mt-5">
                    <div className="d-flex justify-content-center ">
                      <div className="d-flex align-items-center px-3 ">
                        <GenericTooltip
                          placement="top"
                          title="Delete"
                          component={
                            <Image
                              src="/assets/icons/new/delete.png"
                              width="22px"
                              height="25px"
                              className=""
                              alt="back"
                              onClick={() => {
                                setDeleteModal(true);
                              }}
                            />
                          }
                        />
                      </div>
                      <span className="d-flex justify-content-center align-items-center px-5 pb-2 ">
                        {play == false ? (
                          <GenericTooltip
                            placement="top"
                            title="Play"
                            component={
                              <Image
                                src="/assets/icons/new/activeplay.png"
                                width="55px"
                                height="55px"
                                alt="play"
                                className=""
                                onClick={() => {
                                  handlePlay();
                                }}
                              />
                            }
                          />
                        ) : (
                          <GenericTooltip
                            placement="top"
                            title="Pause"
                            component={
                              <Image
                                src="/assets/icons/new/audio_pause.svg"
                                width="55px"
                                height="55px"
                                alt="pause"
                                className=""
                                onClick={() => {
                                  handlePlay();
                                }}
                              />
                            }
                          />
                        )}
                      </span>
                      <div
                        className="text-white semibold px-3 justify-content-end d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          setDotProgressLoading(true);
                          uploadFileInput();
                        }}
                      >
                        Done
                      </div>
                    </div>
                  </div>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AudioGBReplay;
