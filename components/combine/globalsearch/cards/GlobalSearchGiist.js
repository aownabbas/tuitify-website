import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import insertLike from '../../../../redux/actions/InsertLike';
import Image from 'next/image';

const GlobalSearchGiist = (props) => {
  const videoRef = useRef(null);

  const [vid, setVid] = useState(false);
  const [like, setLike] = useState(false);

  const play = () => {
    vid == false ? videoRef.current.play() : videoRef.current.pause();
    vid == false ? setVid(true) : setVid(false);
  };

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [getPlatData, setGetPlatData] = useState(null);

  const [insertLikeData, setInsertLikeData] = useState({
    status: '',
    total: '',
    message: '',
  });

  useEffect(() => {
    const LoginData = JSON.parse(localStorage.getItem('@LoginData'));
    if (LoginData) {
      const id = LoginData.id;
      setId(id);
      const platform_id = LoginData.platform_id;
      setPlatformId(platform_id);

      const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

      if (GetPlatData) {
        const getPlatObject = GetPlatData;
        setGetPlatData(getPlatObject);
      }
    }
    return () => {};
  }, []);

  const onInsertLikeSuccess = (res) => {
    setInsertLikeData(res.data);
  };
  const onInsertLikeError = () => {
    console.log('not ok');
  };

  let createdDate =
    props.tuties != 'undefined' && props.tuties != '' ? moment(props.tuties?.created).format('DD-MM-YYYY') : '';
  return (
    <>
      <div className="p-0 h-100" style={{ overflow: 'scroll' }}>
        <div className="position-relative" style={{ height: '160px', width: '100%' }}>
          <video
            className="img-fluid"
            style={{
              objectFit: 'cover',
              borderRadius: '18px',
              height: '160px',
              width: '95%',
            }}
            ref={videoRef}
            onEnded={() => setVid(false)}
          >
            <source
              src={`https://d12wv9lymg6ml4.cloudfront.net/video/${props.tuties?.introduction}`}
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
          )}
          <div className="card-body col-12 p-0">
            <p className="semibold m-0 text-capitalize">{props.tuties?.tuity_title}</p>
            <p className="card-text regular-xsmall text-truncate pe-3" style={{ opacity: '0.6' }}>
              {/* {props.tuties?.description} */}
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            </p>
            <div className="row ms-0">
              <span className="col-2 p-0">
                <Image
                  className="p-0 rounded-circle"
                  src={
                    props.tuties?.image == null
                      ? '/assets/icons/new/user.svg'
                      : getPlatData
                      ? getPlatData == (null || {})
                        ? ''
                        : `${awsLink}users/profileImages/${props.tuties?.image}`
                      : '/assets/icons/new/user.svg'
                  }
                  alt="Alex Photo"
                  width="32px"
                  height="32px"
                />
              </span>
              <div className="col-8 lh-sm">
                <p className="p-0 m-0 text-capitalize d-flex align-items-start semibold-xsmall">
                  {props.tuties?.first_name}
                </p>
                <p className="light-small">
                  <small>{createdDate}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalSearchGiist;
