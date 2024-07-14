import React, { useState, useRef, useEffect } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import Image from 'next/image';
import classes from './Stepper.module.css';
import TagInput from '../../../ch/briifrecording/recordingform/TagInput';
import Preview from './Preview';
import SkeletonLoader from '../../kh_home/SkeletonLoader';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteS3Media from '../../../../utils/DeleteS3Media';
import CreateChaps from '../../../../redux/actions/CreateChaps';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { makeIdAWS } from '../../../../utils/constants/makeIdAWS';
import { Cropper, ImageRestriction } from 'react-advanced-cropper';
import ThumbnailCropModal from '../../../modals/thumbnailcrop/ThumbnailCropModal';

const CMEpoints = [
  { id: 1, point: 0 },
  { id: 2, point: 1 },
  { id: 3, point: 2 },
  { id: 4, point: 3 },
];

const GiistDetails = (props) => {
  // const [picture, setPicture] = useState(null);
  const {
    platformData,
    awsLink,
    loginData,
    tags,
    setTags,
    setThumbnail,
    thumbnail,
    setThumbnailData,
    thumbnailData,
    setThumbnailFile,
    setCategory,
    category,
    description,
    setDescription,
    title,
    setTitle,
    allGiistCats,
    languagesList,
    selectedlanguage,
    setselectedlanguage,
    detailCreationRes,
    selectCMEPoint,
    setSelectCMEPoint,
    inputLink,
    setInputLink,
    setGiistType,
    checked,
    setChecked,
  } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const get_plat = useSelector((state) => state.get_plat);

  const [thumbnailMessage, setThumbnailMessage] = useState(false);

  const [openThumbnailModal, setOpenThumbnailModal] = useState(false);
  const handleThumbnailModalOpen = () => setOpenThumbnailModal(true);
  const handleThumbnailModalClose = () => setOpenThumbnailModal(false);

  // this commented code will be used in case of no cropping required
  // const onChangePicture = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     let randomName = makeId(20);
  //     let fileFormat = '.png';
  //     let keyPrefix = 'thumbnail';
  //     let dirName = 'giists/images/';

  //     const file = e.target.files[0];
  //     // setThumbnail(file);

  //     reader.onload = function () {
  //       const image = document.createElement('img');
  //     reader.onload = function () {
  //       const image = document.createElement('img');

  //       image.onload = function () {
  //         // console.log(image.width, image.height, 'dekh lo phir');

  //         if (image.width == image.height) {
  //           setThumbnailFile(e.target.files[0]);
  //           setThumbnail(URL.createObjectURL(e.target.files[0]));
  //           let data = {
  //             url: e.target.files[0],
  //             name: keyPrefix + randomName + fileFormat,
  //             type: fileFormat,
  //             link: dirName + keyPrefix + randomName + fileFormat,
  //           };
  //           setThumbnailData(data);
  //         } else {
  //           setThumbnailMessage(true);
  //         }
  //       };
  //       image.src = reader.result;
  //     };
  //   }
  // };

  const handleDeleteThumbnail = async (thumbnail) => {
    if (thumbnail.startsWith(awsLink)) {
      let url = thumbnail;
      const giistUrl = url.substring(url.indexOf('giists'));
      await DeleteS3Media([giistUrl]);
      const paramsGiistDetailUpdate = {
        id: router.query.id ? router.query.id : detailCreationRes?.id,
        title: title,
        description: description,
        category_id: String(category.id),
        tags: String(tags),
        thumbnail: null,
        language: selectedlanguage?.id,
      };
      dispatch(
        CreateChaps(
          paramsGiistDetailUpdate,
          loginData?.access_token,
          onUpdateGiistDetailSuccess,
          onUpdateGiistDetailError,
        ),
      );
      setThumbnail('');
      setThumbnailFile('');
      setThumbnailData('');
    } else {
      setThumbnail('');
      setThumbnailFile('');
      setThumbnailData('');
    }
  };

  const onUpdateGiistDetailSuccess = (res) => {
    console.log(res, 'onUpdateGiistDetailSuccess');
  };
  const onUpdateGiistDetailError = (err) => {
    console.log(err);
  };

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (isChecked == true) {
      setGiistType(1);
    } else {
      setGiistType(2);
      setSelectCMEPoint({ id: null, point: null });
      setInputLink('');
    }
  };

  const [showPane, setShowPane] = useState(false);
  const [showCMEPpoint, setShowCMEPpoint] = useState(false);

  const [languageShow, setLanguageShow] = useState(false);

  const hideCategoryPane = useRef();
  const hidelanguageShow = useRef();
  useOnClickOutside(hideCategoryPane, () => setShowPane(false));

  useOnClickOutside(hidelanguageShow, () => setLanguageShow(false));

  const hideCMEPane = useRef();
  useOnClickOutside(hideCMEPane, () => setShowCMEPpoint(false));

  const DropDownImage = () => {
    return <Image src="/assets/icons/drop-down-icon.svg" height={10} width={10} alt="drop-down-icon" />;
  };

  let fileInput = 'file-input';

  const [srcFile, setSrcFile] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const onChange = (e) => {
    const file = e.target.files[0];

    console.log(file, 'the file');
    let randomName = makeIdAWS(20);
    let fileFormat = '.png';
    let keyPrefix = 'thumbnail';
    let dirName = 'giists/images/';
    if (file) {
      setSrcFile(file);
      const reader = new FileReader();

      reader.onload = () => {
        const img = document.createElement('img');

        img.onload = () => {
          // console.log(reader.result, 'file uploaded img.onload'); gives base64
          const objectURL = URL.createObjectURL(file);
          setImageSrc(reader.result);
          handleThumbnailModalOpen();

          setThumbnailFile(file);
          setThumbnail(objectURL);

          let data = {
            url: file,
            name: keyPrefix + randomName + fileFormat,
            type: fileFormat,
            link: dirName + keyPrefix + randomName + fileFormat,
          };

          setThumbnailData(data);
        };
        img.src = event.target.result;
        // Set the src of the image element after defining the onload event listener
      };
      reader.readAsDataURL(file);
      return;
    } else {
      console.log('File is missing');
    }
  };

  const onInputClick = (event) => {
    event.target.value = '';
  };

  return (
    <>
      <div className="mt-4 row mb-3">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
          <div className="row py-2">
            <div
              className={
                // platformData?.show_cme !== 1
                //   ? `${classes.title} col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-2`
                //   : `${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2`
                `${classes.title} col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-2`
              }
            >
              <label className={`${classes.myfont} py-1`}>
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter giist title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={classes.inputStyle}
              />
            </div>
            <div className={`${classes.select_container} position-relative col-lg-6 col-md-12 col-sm-12 col-xs-12 `}>
              <label className={`${classes.myfont} py-1 `}>
                Select Category <span className="text-danger">*</span>
              </label>
              <div className={`p-2 w-100 ${classes.inputStyle}`} onClick={() => setShowPane(true)}>
                <span className="d-flex justify-content-between">
                  {!category.title == '' ? category.title : 'Select Category'}
                  {showPane == true ? (
                    <div style={{ transform: 'rotate(180deg)' }}>
                      <DropDownImage />
                    </div>
                  ) : (
                    <div>
                      <DropDownImage />
                    </div>
                  )}
                </span>
              </div>
              {showPane == true && (
                <div
                  ref={hideCategoryPane}
                  className="mt-2 p-2 "
                  style={{
                    height: '300px',
                    width: '95%',
                    overflowY: 'scroll',
                    position: 'absolute',
                    background: '#FFFFFF',
                    borderRadius: '10px',
                    boxShadow: '10px 20px 50px grey',
                    zIndex: '1',
                  }}
                >
                  {allGiistCats ? (
                    allGiistCats?.map((cat) => (
                      <div
                        className={`py-1 px-2 cursor-pointer ${classes.listGiist}`}
                        key={cat.id}
                        id={cat.id}
                        onClick={(e) => {
                          setCategory({ id: cat.id, title: cat.title });
                          setShowPane(false);
                        }}
                      >
                        {cat.title}
                      </div>
                    ))
                  ) : (
                    <div className="gap-4 " onClick={() => setShowPane(false)}>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                      <div className="p-1">
                        <SkeletonLoader height={25} borderRadius="10px" width="100%" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div
              className={
                checked == true
                  ? `${classes.select_container} position-relative col-lg-6 col-md-12 col-sm-12 col-xs-12 py-2`
                  : `${classes.select_container} position-relative col-lg-12 col-md-12 col-sm-12 col-xs-12 py-2`
              }
            >
              <div className={`d-flex justify-content-start ${classes.checkBox} px-2`} style={{ paddingTop: '35px' }}>
                <input
                  id="checkboxCme"
                  type="checkbox"
                  onChange={(e) => {
                    handleCheck(e);
                  }}
                  checked={checked}
                />
                <label className={`${classes.cmeCheckTxt} ps-3`} htmlFor="checkboxCme">
                  Is it a CME Training?
                </label>
              </div>
            </div>

            {/* second drop down */}

            {/* shown only on inspire  */}
            {platformData?.show_cme == 1 && checked == true && (
              <>
                <div
                  className={`${classes.select_container} position-relative col-lg-6 col-md-12 col-sm-12 col-xs-12 py-2`}
                >
                  <label className={`${classes.myfont} py-1 `}>
                    CME Points <span className="text-danger">*</span>
                  </label>
                  <div className={`p-2 w-100 ${classes.inputStyle}`} onClick={() => setShowCMEPpoint(true)}>
                    <span className="d-flex justify-content-between">
                      {selectCMEPoint.point !== null ? selectCMEPoint.point : 'Select CME Point'}
                      {showCMEPpoint == true ? (
                        <div style={{ transform: 'rotate(180deg)' }}>
                          <DropDownImage />
                        </div>
                      ) : (
                        <div>
                          <DropDownImage />
                        </div>
                      )}
                    </span>
                  </div>
                  {showCMEPpoint == true && (
                    <div
                      ref={hideCMEPane}
                      className="mt-2 p-2 "
                      style={{
                        height: 'auto',
                        width: '95%',
                        overflowY: 'scroll',
                        position: 'absolute',
                        background: '#FFFFFF',
                        borderRadius: '10px',
                        boxShadow: '10px 20px 50px grey',
                        zIndex: '1',
                      }}
                    >
                      {CMEpoints.map((cmePoint) => (
                        <div
                          id={cmePoint.id}
                          key={cmePoint.id}
                          className={`py-1 px-2 cursor-pointer ${classes.listGiist}`}
                          onClick={(e) => {
                            setSelectCMEPoint({ id: cmePoint.id, point: cmePoint.point });
                            setShowCMEPpoint(false);
                          }}
                        >
                          {cmePoint.point}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="py-2">
                  <div
                    className={`${classes.title} col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2`}
                    style={{
                      opacity: selectCMEPoint.point == null && '0.5',
                      cursor: selectCMEPoint.point == null && 'not-allowed',
                    }}
                  >
                    <label className={`${classes.myfont} py-1`}>
                      CME Link <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Paste your link here"
                      className={classes.inputStyle}
                      disabled={selectCMEPoint.point == null && 'disabled'}
                      // onChange={(e) => linkValidation(e)}
                      onChange={(e) => setInputLink(e.target.value)}
                      value={inputLink}
                    />
                    {/* {activeLink == false && inputLink?.length !== 0 && (
                <p className="text-danger">Please input correct link</p>
              )} */}
                  </div>
                </div>
              </>
            )}
            {/* shown only on inspire */}
          </div>
          <label className={`${classes.myfont} py-1`}>Description</label>
          <div className={`${classes.description} row m-0 mb-3`}>
            <textarea
              name="textarea"
              placeholder="write here..."
              className={`${classes.descriptionBorder} py-2`}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              style={{ resize: 'none' }}
              value={description}
              cols={80}
              rows={4}
              maxLength={300}
            />
          </div>
          <div className="row mb-2">
            {/* <div className={`${classes.select_container} position-relative col-lg-6 col-md-12 col-sm-12 col-xs-12`}> */}
            <div className={`${classes.select_container} position-relative col-lg-6 col-md-12 col-sm-12 col-xs-12`}>
              <label className={`${classes.myfont} py-1`}>Language</label>
              <div className={`p-2 w-100 ${classes.inputStyle} `} onClick={() => setLanguageShow(true)}>
                <span className="d-flex justify-content-between">
                  {selectedlanguage ? selectedlanguage?.title : 'Select Language'}
                  {languageShow == true ? (
                    <div style={{ transform: 'rotate(180deg)' }}>
                      <DropDownImage />
                    </div>
                  ) : (
                    <div>
                      <DropDownImage />
                    </div>
                  )}
                </span>
              </div>
              {languageShow == true && (
                <div
                  ref={hidelanguageShow}
                  className="mt-2 p-2"
                  style={{
                    height: '110px',
                    width: '95%',
                    overflowY: 'scroll',
                    position: 'absolute',
                    background: '#FFFFFF',
                    borderRadius: '10px',
                    boxShadow: '10px 20px 50px grey',
                    zIndex: '1',
                    color: '#FFFFFF',
                  }}
                >
                  {languagesList?.map((cat) => (
                    <div
                      className={`py-1 px-2 cursor-pointer ${classes.textLanguage}`}
                      key={cat.id}
                      id={cat.id}
                      onClick={(e) => {
                        setselectedlanguage({ id: cat.id, title: cat.title });
                        setLanguageShow(false);
                      }}
                    >
                      <span className="me-2">
                        <Image src={cat?.image} width="20px" height="12px" />
                      </span>
                      {cat.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`col-lg-6 col-md-12 col-sm-12 col-xs-12 ${classes.tagSection}`}>
              <TagInput tags={tags} setTags={setTags} giiststags={true} />
            </div>
          </div>
          <div className="row mb-2">
            <div className={`col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-2 ${classes.thumbSection}`}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-6">
                  <div style={{ display: 'block' }}>
                    <label className={`${classes.myfont}`}>Thumbnail</label>
                  </div>
                  <div
                    style={{
                      height: '108px',
                      width: 'auto',
                      background: '#353452',
                      borderRadius: '10px',
                      position: 'relative',
                    }}
                  >
                    <label htmlFor="old-file-input">
                      <div
                        className="w-100"
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%,-50%)',
                        }}
                        // onClick={handleThumbnailModalOpen}
                      >
                        <div className="w-100" style={{ display: 'flex', flexDirection: 'column', opacity: 0.6 }}>
                          <Image
                            src="/assets/images/thumbnail-upload-icon.svg"
                            alt="upload giist"
                            width="30px"
                            height="30px"
                          />
                          <p
                            className="text-white text-center pt-2"
                            style={{ fontWeight: '400', fontSize: '13px', lineHeight: '18px', opacity: 0.6 }}
                          >
                            Upload Thumbnail
                          </p>
                        </div>
                      </div>
                      <input
                        id="old-file-input"
                        style={{ display: 'none' }}
                        accept="image/png, image/gif, image/jpg, image/jpeg"
                        type="file"
                        onChange={onChange}
                        onClick={onInputClick}
                      />
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-6 pt-4 border-0">
                  <div style={{ position: 'relative' }}>
                    <div
                      className={`${classes.preview} d-flex align-items-center justify-content-center`}
                      style={{ fontWeight: '400', fontSize: '13px', lineHeight: '18px' }}
                    >
                      {!thumbnail ||
                      thumbnail == `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/undefined` ||
                      thumbnail == `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/null` ? (
                        ''
                      ) : (
                        <img className={`${classes.preview}`} src={thumbnail} />
                      )}
                    </div>
                    {!thumbnail ||
                    thumbnail == `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/undefined` ||
                    thumbnail == `https://d2bw7r5dl8dn6n.cloudfront.net/giists/images/null` ? (
                      ''
                    ) : (
                      <img
                        src="/assets/icons/new/red_circle_cross.svg"
                        style={{ position: 'absolute', top: 5, right: 5, width: 22, height: 22, cursor: 'pointer' }}
                        alt="trash"
                        onClick={() => handleDeleteThumbnail(thumbnail)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
          {title == undefined ? (
            ''
          ) : (
            <Preview
              title={title}
              thumbnail={thumbnail}
              awsLink={awsLink}
              giistUserPic={loginData?.image}
              first_name={loginData?.first_name}
              last_name={loginData?.last_name}
              description={description}
            />
          )}
        </div>
      </div>
      <ThumbnailCropModal
        open={openThumbnailModal}
        handleCloseModal={handleThumbnailModalClose}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        makeId={makeIdAWS}
        setThumbnailData={setThumbnailData}
        setThumbnailFile={setThumbnailFile}
        thumbnailLabelId={fileInput}
        srcFile={srcFile}
        imageSrc={imageSrc}
        onChange={onChange}
      />
    </>
  );
};

export default GiistDetails;
