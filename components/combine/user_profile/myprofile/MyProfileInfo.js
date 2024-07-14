import React, { useState, useEffect } from 'react';
import classes from '../otheruserprofile/UserProfile.module.css';
import Image from 'next/image';
import COLORS from '../../../../public/assets/colors/colors';
import { Item, NavDropdown, NavItem } from 'react-bootstrap';
import EditImageCropModal from './editimage/EditImageCropModal';
import TabsContainer from './myprofiletabs/TabsContainer';
const MyProfileInfo = (props) => {
  const { getPlatData, awsLink } = props;
  const [editImageModalOpen, setEditImageModalOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  console.log('uploadImage', uploadImage, editImageModalOpen);

  const [uploadedImage, setUploadedImage] = useState('');
  const [video, setVideo] = useState();
  const [type, setType] = useState('');
  const [srcFile, setSrcFile] = useState('');

  const [checkImage, setcheckImage] = useState('');
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (uploadedImage == '') {
      props.setProfilePic(awsLink + 'users/profileImages/' + props.userProfileDetails.userProfile[0]?.image);
    }
  }, [uploadedImage, props.userProfileDetails.userProfile[0]?.image]);

  const [imageSrc, setImageSrc] = useState(uploadedImage == '' ? props.profilePic : uploadedImage);

  useEffect(() => {
    let pic = props.profilePic;
    let afterdot = pic.lastIndexOf('.');
    let type = pic.substring(afterdot + 1);
    setType(type);
    return () => {};
  }, [props.profilePic]);

  const onChange = (e) => {
    setcheckImage('');
    setSrc('');
    if (e.target.files[0]) {
      setEditImageModalOpen(true);
      setUploadImage(true);
    }
    const file = e.target.files[0];
    setSrcFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');

      img.onload = () => {
        const height = img.naturalHeight;
        const width = img.naturalWidth;
        if (height !== width) {
          // Display an alert with a custom message
          setcheckImage('You must upload an image having same width and Height,');
          return;
        }
        setSrc(URL.createObjectURL(file));
        setImageSrc(reader.result);
      };
      img.src = event.target.result;

      // Set the src of the image element after defining the onload event listener
    };
    reader?.readAsDataURL(file);
  };

  return (
    <>
      {editImageModalOpen == true && (
        <EditImageCropModal
          fname={props.fname}
          lname={props.lname}
          setLname={props.setLname}
          setFname={props.setFname}
          companyName={props.companyName}
          setCompanyName={props.setCompanyName}
          department={props.department}
          setDepartment={props.setDepartment}
          position={props.position}
          setPosition={props.setPosition}
          phoneNumber={props.phoneNumber}
          setPhoneNumber={props.setPhoneNumber}
          linkedinUrl={props.linkedinUrl}
          setLinkedinUrl={props.setLinkedinUrl}
          description={props.description}
          setDescription={props.setDescription}
          profilePic={props.profilePic}
          setProfilePic={props.setProfilePic}
          mybearerToken={props.mybearerToken}
          modalOpen={editImageModalOpen}
          uploadImage={uploadImage}
          setVideo={setVideo}
          handleModalClose={setEditImageModalOpen}
          // uploadProfilePic={uploadProfilePic}
          setUploadedImage={setUploadedImage}
          uploadedImage={uploadedImage}
          // onImageChange={onImageChange}
          // uploadThumbnail={uploadThumbnail}
          getPlatData={getPlatData}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          checkImage={checkImage}
          setcheckImage={setcheckImage}
          setSrc={setSrc}
          src={src}
          setType={setType}
          type={type}
          srcFile={srcFile}
          setSrcFile={setSrcFile}
          setEditImageModalOpen={setEditImageModalOpen}
          setUploadImage={setUploadImage}
        />
      )}
      <div className={`${classes.card}`} style={{ overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
        {/* <CircleLoader /> */}
        <div className="card-body">
          <div className="card-title ">
            <div className="text-center ">
              {props.userProfileDetails.userProfile?.map((users) => (
                <>
                  <div className="position-relative d-inline-flex">
                    <span className="position-relative">
                      {video ? (
                        <video
                          className="VideoInput_video"
                          width="138px"
                          height={138}
                          controls
                          src={video}
                          style={{ borderRadius: '50%' }}
                        />
                      ) : (
                        //Aown: In userprofile page there is change about cam image margins
                        // if there is no image, this condition is showing text and making it centeralized
                        <div className={`${classes.imgContainer}`}>
                          {uploadedImage !== '' || users.image ? (
                            <Image
                              className={`${classes.imgFrame} img-fluid mt-0 text-center`}
                              src={uploadedImage != '' ? uploadedImage : awsLink + 'users/profileImages/' + users.image}
                              alt="User Profile picture"
                              height={138}
                              width={138}
                            />
                          ) : (
                            <div className={`${classes.altText}`}>User Profile picture</div>
                          )}
                        </div>
                      )}
                    </span>
                    <div className={`${classes.dpCameraImg} position-absolute`}>
                      {/* Aown: In userprofile page there is change about cam image margins */}
                      <label htmlFor="file" className="mt-1">
                        <Image src="/assets/images/dpcamera.svg" width={20} height={20} alt="dropdownSearch" />
                        <input
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg"
                          style={{ display: 'none' }}
                          onChange={onChange}
                        />
                      </label>
                      {/* <NavDropdown
                        title={
                          <Image src="/assets/images/dpcamera.svg" width={20} height={20} alt="dropdownSearch" />
                          
                        }
                        id="border-0"
                        className="p-0 myprofile-photoedit-dropdown"
                      > */}
                      {/* <NavDropdown.Item
                          className="px-0 pb-0 pt-3 border-0 m-0"
                          style={{
                            backgroundColor: COLORS.mainColor,
                            borderRadius: '10px 10px 0px 0px',
                            borderBottom: '0px solid black',
                          }}
                        >
                          <div className="ps-1 d-flex align-items-center">
                            <span className="dropdown-text regular-mid text-white ms-2 d-flex align-items-center">
                              {' '}
                              Change Profile{' '}
                            </span>
                          </div>
                          <hr className="bg-white text-white mx-auto mb-0 mt-2" style={{ width: '130px' }} />
                        </NavDropdown.Item> */}
                      {/* <NavDropdown.Item
                          className="px-0 pb-2 pt-2 border-0 m-0 border-bottom-0"
                          style={{
                            backgroundColor: COLORS.mainColor,
                            borderRadius: '0px',
                            borderBottom: '0px solid black',
                          }}
                        >
                          <div
                            onClick={() => {
                              setEditImageModalOpen(true);
                              setUploadImage(true);
                            }}
                            className="ps-1 d-flex align-items-center"
                          >
                            <span className="dropdown-text regular-small text-white ms-2 d-flex align-items-center">
                              <span
                                className="me-2 d-flex align-items-center"
                             
                              >
                                <Image
                                  src="/assets/icons/new/uploadImageIcon.svg"
                                  width="16px"
                                  height="16px"
                                  alt="videocam"
                                />
                              </span>
                              Upload Picture
                            </span>
                          </div>
                        </NavDropdown.Item> */}
                      {/* <NavDropdown.Item
                          className="px-0 pb-2 pt-2 border-0 m-0 border-bottom-0"
                          style={{
                            backgroundColor: COLORS.mainColor,
                            borderRadius: '0px 0px 10px 10px',
                            borderBottom: '0px solid black',
                          }}
                        >
                          <div
                            onClick={() => {
                              setEditImageModalOpen(true);
                              setUploadImage(false);
                            }}
                            className="ps-1 d-flex align-items-center"
                          >
                            <span className="dropdown-text regular-small text-white ms-2 d-flex align-items-center">
                              {' '}
                              <span className="me-2 d-flex align-items-center">
                                <Image
                                  src="/assets/icons/new/whiteImageIcon.svg"
                                  width="16px"
                                  height="12px"
                                  alt="videocam"
                                />
                              </span>
                              Upload Video{' '}
                            </span>
                          </div>
                        </NavDropdown.Item> */}
                      {/* </NavDropdown> */}
                    </div>
                    {/* this is crop image dropdown end  */}
                  </div>
                  {/*Aown: In userprofile page there is change about cam image margins */}
                  <p className={`${classes.userName} mt-1`}>
                    {`${
                      (users.first_name + ' ' + users.last_name).length > 14
                        ? (users.first_name + ' ' + users.last_name).slice(0, 14) + '...'
                        : users.first_name + ' ' + users.last_name
                    }`}
                  </p>
                </>
              ))}

              {props.userProfileDetails.userProfile?.map((users) => (
                <p className={classes.userEmail} key={users.id}>
                  {users.email}
                </p>
              ))}
            </div>
          </div>

          <div className="container">
            {props.userProfileDetails.userProfile?.map((item) => (
              <div className="row text-center mb-3">
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <p className={classes.userFollowers}>{item.following_users_count}</p>
                  <p className={classes.userfolTxt}>Following</p>
                </div>
                <div className={`${classes.leftborder} col-md-6 col-sm-6 col-xs-6`}>
                  <p className={classes.userFollowers}>{item.followed_users_count}</p>
                  <p className={classes.userfolTxt}>Followers</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <TabsContainer
              userProfileDetails={props.userProfileDetails}
              userGroups={props.userGroups}
              userActivity={props.userActivity}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfileInfo;
