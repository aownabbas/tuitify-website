import { Typography } from '@mui/material';
import Image from 'next/image';
import { useRef, useState } from 'react';
import classes from './SearchKnowledge.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircleLoader from '../../../components/combine/user_profile/circleloader/CircleLoader';

const SearchCard = ({ title, user, date, cardRating, category }) => {
  const [like, setLike] = useState(false);
  const videoRef = useRef(null);

  const [vid, setVid] = useState(false);
  const play = () => {
    vid == false ? videoRef.current.play() : videoRef.current.pause();
    vid == false ? setVid(true) : setVid(false);
  };
  return (
    <div className="col-md-3 mb-3">
      <div className="card mt-2" style={{ borderRadius: '15px', height: '284px' }}>
        <div className="card-body">
          <div className="w-100 ">
            <div style={{ borderRadius: '15px' }}>
              <div className="row" style={{ position: 'relative' }}>
                <Image
                  src="/assets/images/office.png"
                  alt="office"
                  className="img-fluid "
                  height={167}
                  width={320}
                  style={{ position: 'relative' }}
                />
                {/* need commented code in future to play video */}
                {/* <video
                  ref={videoRef}
                  onEnded={() => setVid(false)}
                  controls
                  className="mb-2 mt-0 img-fluid"
                >
                  <source
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    type="video/mp4"
                  />
                </video>
                {vid == false ? (
                  <span className="position-absolute top-50 start-50 translate-middle">
                    <Image
                      src="/assets/icons/new/circle_play.svg"
                      onClick={play}
                      className=""
                      alt="play"
                      width="32px"
                      height="32px"
                    />
                  </span>
                ) : (
                  <span className="position-absolute top-50 start-50 translate-middle">
                    <Image
                      src="/assets/icons/new/video_pause.svg"
                      onClick={play}
                      className=""
                      alt="pause"
                      width="32px"
                      height="32px"
                    />
                  </span>
                )} */}
              </div>
              <div style={{ position: 'absolute', top: '9%', left: '10%' }}>
                <p className={`${classes.cardImgTxt} text-white`}>
                  <Image
                    src="/assets/images/star.png"
                    alt="star"
                    style={{ marginBottom: '5px', marginRight: '5px' }}
                    height="15.32"
                    width="16.29"
                  />
                  {cardRating}
                </p>
              </div>
              <div style={{ position: 'absolute', top: '9%', right: '20%' }}>
                <Image src="/assets/images/flag.png" alt="flag" height="16" width="30" />
              </div>
              <div style={{ position: 'absolute', top: '9%', right: '10%' }}>
                {like === false ? (
                  <Image
                    src="/assets/images/Heart.png"
                    alt="heart"
                    height="16"
                    width="17.46"
                    onClick={() => setLike(true)}
                  />
                ) : (
                  <FavoriteIcon sx={{ color: '#46BB59' }} onClick={() => setLike(false)} />
                )}
              </div>
            </div>
          </div>

          <div className="mb-0">
            <p className={`card-title mt-2 mb-3 ${classes.cardtext}`}>{title}</p>
            <div className="mb-0 row">
              <div className="w-25 text-center">
                <Image src="/assets/images/alexa.png" alt="" className="rounded" width={44} height={44} />
              </div>
              <div className="w-50">
                <p className={`${classes.cardUserName} mb-1`}>{user}</p>
                <span className={`${classes.cardDate}`}>{date}</span>
              </div>
              <div className="w-25 ">
                <CircleLoader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
