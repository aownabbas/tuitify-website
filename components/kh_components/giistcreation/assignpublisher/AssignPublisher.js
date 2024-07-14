import React, { useState, useEffect, useRef } from 'react';
import Preview from '../giistdetails/Preview';
import classes from './AssignPublisher.module.css';
import Image from 'next/image';
import forwardBriif, { getGorupData } from '../../../../redux/actions/Forward';
import { useDispatch } from 'react-redux';
import useOnClickOutside from 'use-onclickoutside';
import { useRouter } from 'next/router';
import { Tabs, Tab } from '@material-ui/core';
import SetAudience from '../../../combine/audience/SetAudience';
import useInfiniteScroll from '../../../../utils/constants/useInfiniteScroll';
import SetPublihser from './SetPublihser';

const AssignPublisher = (props) => {
  const {
    allUsers,
    allGroups,
    setAllGroups,
    setAllUsers,
    checkedUsers,
    checkedGroups,
    setCheckedGroups,
    setCheckedUsers,
    setSelectedCheckbox,
    selectedCheckbox,
    awsLink,
    setAudienceUser,
    audienceUser,
  } = props;
  const router = useRouter();
  const [showUsers, setShowUsers] = useState(false);
  const [showAudience, setShowAudience] = useState(false);

  const audienceRef = useRef();

  // for outSider Click
  useOnClickOutside(audienceRef, () => setShowAudience(false));

  const [searchPublisher, setSearchPublisher] = useState('');

  const [tags, setTags] = useState([]);
  const pageSize = 10;

  useEffect(() => {
    if (props.publisher != null) {
      document.getElementsByClassName('myInput').value = '';
    }
  }, [props.publisher]);

  const handleCheckboxChange = (event) => {
    if (event.target.id == '1') {
      setCheckedGroups([]);
      setCheckedUsers([]);
    }
    setSelectedCheckbox(event.target.id);
  };

  const handleTagRemove = (tagIndex) => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  const publisherRef = useRef();
  useOnClickOutside(publisherRef, () => {
    if (showUsers) {
      setShowUsers(false);
    }
  });

  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 mb-3">
          <div className="row">
            <div className="regular-xsmall text-secondary pt-2">
              <span className="semibold-large">My Publisher</span>
              <span className="ms-1">(optional)</span>
            </div>
            <p className="regular-xsmall">Select Your Publisher</p>
            <section className="d-flex align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-3 mt-3">
                <div className="position-relative" ref={publisherRef} style={{ width: '100%' }}>
                  <input
                    type="text"
                    placeholder="Search publisher by name..."
                    disabled={props.publisher != null ? true : false}
                    onClick={(e) => {
                      showUsers == true ? '' : setShowUsers(true);
                    }}
                    value={searchPublisher}
                    className={`${classes.myInput}`}
                    onChange={(e) => setSearchPublisher(e.target.value)}
                  />
                  {showUsers && (
                    <SetPublihser
                      platformData={props.platformData}
                      loginData={props.loginData}
                      setPublisher={props.setPublisher}
                      searchPublisher={searchPublisher}
                      setSearchPublisher={setSearchPublisher}
                      showUsers={showUsers}
                      setShowUsers={setShowUsers}
                    />
                  )}
                </div>
              </div>
              <div>
                {props.publisher == null ? (
                  ''
                ) : (
                  <div className={`${classes.tag} col-lg-6 col-md-6 col-sm-6 col-xs-12`}>
                    <div className="d-flex align-items-center justify-content-between " style={{ cursor: 'pointer' }}>
                      <div className="gap-3 pt-1 px-0 d-flex  align-items-center justify-content-center">
                        <Image
                          style={{ borderRadius: '15px' }}
                          src={
                            props.publisher.image == null
                              ? '/assets/icons/new/user.svg'
                              : `${awsLink}users/profileImages/${props.publisher.image}`
                          }
                          height={30}
                          width={30}
                          alt="avatar"
                        />
                      </div>
                      <div className="semibold-mid-small text-nowrap p-2 ">
                        {`${(props.publisher.first_name + ' ' + props.publisher.last_name).length > 14
                          ? (props.publisher.first_name + ' ' + props.publisher.last_name).slice(0, 14) + '...'
                          : props.publisher.first_name + ' ' + props.publisher.last_name
                          }`}
                        <p className="medium-small text-secondary mb-0">{props.publisher.email}</p>
                      </div>
                      <div className=" px-0 d-flex justify-content-center">
                        <Image
                          src="/assets/icons/new/whitecirclecross.svg"
                          onClick={(e) => {
                            props.setPublisher(null);
                          }}
                          width="21px"
                          height="21px"
                          alt="cross"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <div
              className="d-flex flex-column  justify-content-center "
              style={{
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '24px',
              }}
            >
              <p>Only one publisher is allowed,</p>
              <p style={{ color: '#4e6afe' }}>( Note: You can publish this giist on your own too )</p>
            </div>
            <div className="col-md-12 col-sm-12 mt-4">
              <h1 className="semibold-large m-0">Assign Audience</h1>
              <p className="regular-xsmall m-0">Choose the users who have the right to see your giist</p>
            </div>
            <SetAudience
              setAudienceUser={setAudienceUser}
              setAllGroups={setAllGroups}
              setShowAudience={setShowAudience}
              showAudience={showAudience}
              checkedUsers={checkedUsers}
              checkedGroups={checkedGroups}
              selectedCheckbox={selectedCheckbox}
              platformData={props.platformData}
              audienceUser={audienceUser}
              setCheckedUsers={setCheckedUsers}
              setCheckedGroups={setCheckedGroups}
              allGroups={allGroups}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pt-5 mb-3">
          <Preview
            title={props.title}
            thumbnail={props.thumbnail}
            awsLink={awsLink}
            giistUserPic={props.loginData?.image}
            first_name={props.loginData?.first_name}
            last_name={props.loginData?.last_name}
            description={props.description}
          />
        </div>
      </div>
    </>
  );
};

export default AssignPublisher;
