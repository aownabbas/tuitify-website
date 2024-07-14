import React, { useState, useEffect } from 'react';
import moment from 'moment';
import BriifIcons from './globalsearchbriificons/BriifIcons';
import Image from 'next/image';
import COLORS from '../../../../public/assets/colors/colors';
import { withRouter, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import playBriifFunction from '../../../../redux/actions/PlayBriifFunction';
import sidebar from '../../../../redux/actions/Sidebar';
import GenericTooltip from '../../../ch/GenericTooltip';

const GlobalSearchBriif = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  // const { playBriifFunction } = useSelector((state) => state.play_briif_function);

  const [id, setId] = useState('');
  const [platformId, setPlatformId] = useState('');

  const [getPlatData, setGetPlatData] = useState(null);

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
    // console.log(playBriifFunction);
    // console.log(props.router.query.handlePlayedBriif());

    return () => {};
  }, []);

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  console.log(props.briffs?.id, props.briffs.briff_status);

  let createdDate = props.briffs != 'undefined' ? moment(props.briffs?.created).format('DD-MM-YYYY') : '';

  return (
    <>
      <div
        className={props.tab == 'all' ? 'border mt-2 shadow-sm mb-2 me-2 px-0' : 'border mt-2 shadow-sm mb-2 me-2 px-0'}
        style={{ height: '95px', borderRadius: '15px' }}
      >
        <div
          // className="row d-flex align-items-center p-0 justify-content-center"
          className="row w-100 m-0 d-flex align-items-center"
          style={{ height: '90px' }}
          onClick={(e) => {
            props.briffs?.briff_status == 'pin_recive' || props.briffs?.briff_status == 'recive'
              ? dispatch(sidebar('receive'))
              : props.briffs?.briff_status == 'pin_send' || props.briffs?.briff_status == 'send'
              ? dispatch(sidebar('sent'))
              : props.briffs?.briff_status == 'archived' && dispatch(sidebar('archived'));
            dispatch(playBriifFunction(props.briffs?.id));
            router.push({ pathname: '/' });
            // props.router.query.handlePlayedBriif(props.briffs.id)
            // dispatch(playBriifFunction(props.briffs.id))
          }}
        >
          <div className="position-relative text-center px-0 col-3" style={{ height: '44px' }}>
            {props.briffs.type == 'mp3' || props.briffs.type == 'audio' ? (
              <>
                {props.briffs.thumbnail == 'undefined.png' || props.briffs.thumbnail == 'undefined' ? (
                  getPlatData ? (
                    getPlatData == (null || {}) ? (
                      ''
                    ) : (
                      <span className="position-relative ">
                        <Image
                          className="ps-1"
                          style={{ borderRadius: '50% 50% 0% 50%', backgroundColor: COLORS.mainColor }}
                          width="43px"
                          height="43px"
                          // src={`${getPlatData.link}logos/${getPlatData.logo}`}
                          src="/assets/logo/transparent_logo.svg"
                          alt="Received Briif"
                        />
                      </span>
                    )
                  ) : (
                    ''
                  )
                ) : getPlatData ? (
                  getPlatData == (null || {}) ? (
                    ''
                  ) : (
                    <span className="position-relative">
                      <Image
                        className=" ps-1"
                        style={{ borderRadius: '50% 50% 0% 50%' }}
                        width="43px"
                        height="43px"
                        src={`${awsLink}briffs/${props.briffs?.thumbnail}`}
                        alt="Received Briif"
                      />
                    </span>
                  )
                ) : (
                  ''
                )}
                <span className="position-absolute top-50 start-50 translate-middle">
                  <GenericTooltip
                    placement="top"
                    title="Audio"
                    component={
                      <Image src="/assets/icons/creationicons/ic_mic.png" width="10px" height="16px" alt="creation" />
                    }
                  />
                </span>
              </>
            ) : (
              <>
                {props.briffs.thumbnail == 'undefined.png' || props.briffs.thumbnail == 'undefined' ? (
                  getPlatData ? (
                    getPlatData == (null || {}) ? (
                      ''
                    ) : (
                      <span className="position-relative">
                        <Image
                          className=" ps-1"
                          style={{ borderRadius: '50% 50% 0% 50%', backgroundColor: COLORS.mainColor }}
                          width="43px"
                          height="43px"
                          // src={`${getPlatData.link}logos/${getPlatData.logo}`}
                          src="/assets/logo/transparent_logo.svg"
                          alt="Received Briif"
                        />
                      </span>
                    )
                  ) : (
                    ''
                  )
                ) : getPlatData ? (
                  getPlatData == (null || {}) ? (
                    ''
                  ) : (
                    <span className="position-relative">
                      <Image
                        className=" ps-1"
                        style={{ borderRadius: '50% 50% 0% 50%' }}
                        width="43px"
                        height="43px"
                        src={`${awsLink}briffs/${props.briffs?.thumbnail}`}
                        alt="Received Briif"
                      />
                    </span>
                  )
                ) : (
                  ''
                )}
                <span className="position-absolute top-50 start-50 translate-middle">
                  <GenericTooltip
                    placement="top"
                    title="Video"
                    component={
                      <Image
                        src="/assets/icons/creationicons/videocam.png"
                        width="16px"
                        height="10px"
                        className=""
                        alt="creation"
                      />
                    }
                  />
                </span>
              </>
            )}
          </div>
          <div className="col-9 px-0">
            <p className="semibold-small m-0 text-capitalize">{props.briffs?.title}</p>
            <p className="card-text regular-xxsmall text-truncate pe-3" style={{ opacity: '0.6' }}>
              {props.briffs?.description}.
            </p>
          </div>
          <hr
            className="text-secondary mb-0 p-0"
            // style={{ width: "302px" }}
          />
          <div className="col-6 row d-flex align-items-center ms-1 ps-2">
            <span className="col-2 p-0">
              <Image
                className="p-0 rounded-circle"
                src={
                  props.briffs.image == null
                    ? '/assets/icons/new/user.svg'
                    : getPlatData
                    ? getPlatData == (null || {})
                      ? ''
                      : `${awsLink}users/profileImages/${props.briffs?.image}`
                    : '/assets/icons/new/user.svg'
                }
                alt="Alex Photo"
                width="20px"
                height="20px"
              />
            </span>
            <div className="col-8 lh-sm px-2">
              <p className="p-0 m-0 text-capitalize d-flex align-items-start medium-small text-nowrap text-black">
                {props.briffs?.first_name}
              </p>
              <p className="light-xsmall text-secondary text-nowrap m-0">
                <small>{createdDate}</small>
              </p>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <BriifIcons
              briff_status={props.briffs.briff_status}
              id={props.briffs.id}
              is_read={props.briffs.is_read}
              a_id={props.briffs.a_id}
              count={props.briffs.count}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(GlobalSearchBriif);
