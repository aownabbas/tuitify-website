import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import styles from '../../../components/ch/briifrecording/videocreation/VideoCreation.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import COLORS from '../../../public/assets/colors/colors';
import moment from 'moment';
import Slider from '@mui/material/Slider';
import ReactPlayer from 'react-player';
import AlertModal from '../../../components/modals/alertmodal/AlertModal';
import GenericTooltip from '../../../components/ch/GenericTooltip';
import PrimaryMediaPlayer from '../../../components/combine/mediaPlayer/PrimaryMediaPlayer';
import DotProgress from '../../../components/DotProgress';
import DummyDeleteModal from '../../../components/modals/deletemodal/DummyDeleteModal';

function valuetext(value) {
  // console.log(value);
  return `${value}°C`;
}

const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00';
  }
  const date = new Date(seconds * 1000);

  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const VideoReplay = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log('sflsk', router.query.name);

  const [backModal, setBackModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [playing, setPlaying] = useState(true);
  const [platformData, setPlatformData] = useState(null);

  useEffect(() => {
    let platfromData = JSON.parse(localStorage.getItem('@LoginData'));
    setPlatformData(platfromData);
    setPlaying(true);
    return () => {};
  }, []);

  const handleBackModal = () => {
    router.push('/ch/VideoBriifCreation');
  };
  return (
    <>
      {deleteModal == true && (
        <DummyDeleteModal
          openModal={deleteModal}
          handleCloseModal={() => {
            setDeleteModal(false);
          }}
          image={'/assets/images/trash.svg'}
          heading="Delete"
          text="Are you sure, you want to delete this recording?"
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => {
            handleBackModal();
          }}
        />
      )}
      {backModal == true && (
        <DummyDeleteModal
          openModal={backModal}
          handleCloseModal={() => {
            setBackModal(false);
          }}
          image={'/assets/icons/new/exit.png'}
          heading="Exit!"
          text="You are about to loose your recording, do you confirm?"
          buttonText1="No"
          buttonText2="Yes"
          handleClick={() => {
            handleBackModal();
          }}
        />
      )}
      <Layout heading="Communication Hub">
        {loading && <DotProgress />}
        <div className="col-12 justify-content-center row w-100 mx-auto px-0 h-100">
          <div className="position-absolute px-0 h-100">
            <div className={`${styles.title} position-relative w-75 mx-auto h-100`}>
              {loading == true && <DotProgress dotColor={'grey'} />}
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
                      setLoading(true);
                      router.push({
                        // pathname: "../../../../ch/RecordingForm",
                        pathname: '/ch/RecordingForm',
                        query: {
                          name: `${router.query.name}`,
                          type: router.query.type,
                          seconds: `${router.query.seconds}`,
                          recording: router.query.recording,
                        },
                      });
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
                  }}
                >
                  <PrimaryMediaPlayer
                    link={router.query.name}
                    platformData={platformData}
                    time={router.query.seconds}
                    playing={playing}
                    setPlaying={setPlaying}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VideoReplay;
