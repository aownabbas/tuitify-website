import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PrimaryMediaPlayer from '../../../../combine/mediaPlayer/PrimaryMediaPlayer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
  border: '0px',
  borderRadius: '15px',
  // p: 5,
};

const VideoInteraction = (props) => {
  const videoRef = useRef(null);
  const [vid, setVid] = useState(false);
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [getPlatData, setGetPlatData] = useState(null);

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [interactionsData, setInteractionsData] = useState({
    status: '',
    interactions: [],
    message: [],
  });

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }

    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);
    }
    return () => {};
  }, []);
  const [playing, setPlaying] = useState(true);
  return (
    <>
      {modalOpen == true && (
        <Modal
          style={{ zIndex: '999999' }}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{
              background: 'linear-gradient(180deg, #F6F2F1,#F6F2F1, #ddd4d4,rgb(59 64 84))',
              aspectRatio: '16/9',

              // height: '270px',
              // width: '480px',
              borderRadius: '10px',
            }}
          >
            {/* <video
              ref={videoRef}
              style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '20px', aspectRatio: '16/9' }}
              className="col-12 border-0 mt-1 "
              onEnded={() => setVid(false)}
              controls
            >
              <source
                src={
                  props.lastVideoFile == '' ? `${awsLink}briffs/interactions/video/${props.link}` : props.lastVideoFile
                }
                type="video/mp4"
              />
            </video> */}
            <PrimaryMediaPlayer
              link={`${awsLink}briffs/interactions/video/${props.link}`}
              playing={playing}
              setPlaying={setPlaying}
            />
            {/* {vid == false ? (
              <span
                className="d-flex align-items-center position-absolute top-50 start-50 translate-middle"
                // style={{ left: "60px" }}
              >
                <Image
                  src="/assets/icons/new/polygon_30.svg"
                  onClick={play}
                  // onClick={()=>{setModalOpen(true)}}
                  className=""
                  alt="play-button"
                  width="19px"
                  height="19px"
                />
              </span>
            ) : (
              <span
                className="d-flex align-items-center position-absolute top-50 start-50 translate-middle"
                // style={{ left: "70px" }}
              >
                <Image
                  src="/assets/icons/new/video_pause.svg"
                  onClick={play}
                  className=""
                  alt="pause-button"
                  width="19px"
                  height="19px"
                />
              </span>
            )} */}
          </Box>
        </Modal>
      )}

      <div className="row d-flex justify-content-start ms-5 img-container">
        <div style={{ maxHeight: '80px', minHeight: '60px' }}>
          <div className=" position-relative" style={{ width: '80px' }}>
            <video
              ref={videoRef}
              style={{
                objectFit: 'cover',
                width: '80px',
                height: '80px',
                maxHeight: '80px',
                minHeight: '80px',
              }}
              onEnded={() => setVid(false)}
              className="col-12 video-img interaction-videoPlayer position-relative"
            >
              <source
                src={
                  props.lastVideoFile == '' ? `${awsLink}briffs/interactions/video/${props.link}` : props.lastVideoFile
                }
                type="video/mp4"
              />
            </video>

            {/* {vid == false ? ( */}
            <span
              className="d-flex align-items-center position-absolute top-50 start-50 translate-middle"
              // style={{ left: "60px" }}
            >
              <Image
                src="/assets/icons/new/polygon_30.svg"
                // onClick={play}
                onClick={() => {
                  setModalOpen(true);
                }}
                className=""
                alt="play-button"
                width="19px"
                height="19px"
              />
            </span>
            {/* ) : (
              <span
                className="d-flex align-items-center position-absolute top-50 start-50 translate-middle"
                // style={{ left: "70px" }}
              >
                <Image
                  src="/assets/icons/new/video_pause.svg"
                  onClick={play}
                  className=""
                  alt="pause-button"
                  width="19px"
                  height="19px"
                />
              </span>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoInteraction;
