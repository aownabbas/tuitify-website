import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { URL } from '../../../../public/assets/path/path';
import { GlobalApiCall } from '../../../../redux/GlobalApiCall';
import SuccessErrorModal from '../../../modals/successErrormodal/SuccessErrorModal';
import classes from './MyProfile.module.css';
const MyProfileEdit = (props) => {
  // const [fname, setFname] = useState('');
  // // const [firstName, setFirstname] = useState('');
  // const [lname, setLname] = useState('');
  // const [companyName, setCompanyName] = useState('');
  // const [department, setDepartment] = useState('');
  // const [position, setPosition] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [linkedinUrl, setLinkedinUrl] = useState('');
  // const [description, setDescription] = useState('');
  const [editToUpdate, setEditToUpdate] = useState(true);
  const apiPropUserData = props.userProfileDetails.userProfile[0];
  console.log(editToUpdate, 'To edit');

  const handleEditButton = () => {
    if (editToUpdate == false) {
      setEditToUpdate(true);
      editifnormation();
      console.log('edit console');
    } else {
      setEditToUpdate(false);
      console.log('update console');
    }
  };
  const enabledDisabled = editToUpdate == false ? '' : 'false';

  const callingApionButton = () => {
    if (editToUpdate == false) {
      editifnormation();
      handleEditButton();
    } else {
      handleEditButton();
    }
  };

  // input field states
  const [firstName, setFirstName] = useState(props.userProfileDetails.userProfile[0]?.first_name);
  const [updateResponse, setUpdateResponse] = useState(null);

  const [updateInfo, setUpdateInfo] = useState(false);
  const handleUpdateInfoModalOpen = () => setUpdateInfo(true);
  const handleUpdateInfoModalClose = () => setUpdateInfo(false);

  console.log(updateResponse, updateInfo, 'updateResponse');

  const editifnormation = async () => {
    var axios = require('axios');
    var data = JSON.stringify({
      firstName: props.fname,
      lastName: props.lname,
      company: props.companyName,
      department: props.department,
      position: props.position,
      phone: props.phoneNumber,
      linkedin: props.linkedinUrl,
      description: props.description,
    });
    console.log(data, 'my response data');
    // var config = {
    //   method: 'post',
    //   url: `${URL.khbaseUrl}updateUserProfile`,
    //   headers: {
    //     Authorization: 'Bearer ' + props.mybearerToken,
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // };
    await GlobalApiCall(
      `${URL.khbaseUrl}updateUserProfile`,
      'post',
      data,
      function (response) {
        setUpdateResponse(response.data);
        handleUpdateInfoModalOpen();
        console.log(JSON.stringify(response.data), 'api name');
      },
      function (error) {
        console.log(error);
      },
    );
    // axios(config)
    //   .then(function (response) {
    //     setUpdateResponse(response.data);
    //     handleUpdateInfoModalOpen();
    //     console.log(JSON.stringify(response.data), 'api name');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  useEffect(() => {
    props.setFname(apiPropUserData?.first_name);
    props.setLname(apiPropUserData?.last_name);
    props.setCompanyName(apiPropUserData?.company);
    props.setDepartment(apiPropUserData?.department);
    props.setPosition(apiPropUserData?.position);
    props.setPhoneNumber(apiPropUserData?.phone);
    props.setLinkedinUrl(apiPropUserData?.linkedin);
    props.setDescription(apiPropUserData?.description);
  }, [apiPropUserData]);
  return (
    <>
      {updateResponse == true && (
        <SuccessErrorModal
          open={updateInfo}
          onClose={handleUpdateInfoModalClose}
          updateResponse={updateResponse}
          modalMessage={updateResponse.message}
        />
      )}
      <div className={`${classes.detailsCard} mb-3`}>
        <div className="card-body">
          <>
            <div className="row">
              <div className="col-md-6">
                <div className={`${classes.detailCardTitle} card-title mt-2`}>Profile Details</div>
              </div>
              <div className=" col-md-6">
                <button className={classes.userButton} onClick={handleEditButton}>
                  {editToUpdate == false ? 'Update Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="fname">
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  value={props.fname}
                  onChange={(e) => {
                    props.setFname(e.target.value);
                  }}
                  className={`${classes.inputIcon} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="lname">
                  Last Name
                </label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  value={props.lname}
                  onChange={(e) => props.setLname(e.target.value)}
                  className={`${classes.inputIcon} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="company">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company Name"
                  value={props.companyName}
                  onChange={(e) => props.setCompanyName(e.target.value)}
                  className={`${classes.inputIconCompany} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="depart">
                  Department
                </label>
                <input
                  type="text"
                  id="depart"
                  name="department"
                  placeholder="Department Name"
                  value={props.department}
                  onChange={(e) => props.setDepartment(e.target.value)}
                  className={`${classes.inputIconDepartment} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="position">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Position Name"
                  value={props.position}
                  onChange={(e) => props.setPosition(e.target.value)}
                  className={`${classes.inputIconPosition} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={props.phoneNumber}
                  onChange={(e) => props.setPhoneNumber(e.target.value)}
                  className={` ${classes.inputIconPhone} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 ">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="linkedIn">
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedIn"
                  name="linkedIn"
                  placeholder="LinkedIn"
                  value={props.linkedinUrl}
                  onChange={(e) => props.setLinkedinUrl(e.target.value)}
                  className={`${classes.inputIconLinkedin} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
              <div className="col-md-6">
                <label className={`${classes.detailsLabel} mb-2`} htmlFor="desc">
                  Description
                </label>
                <input
                  type="text"
                  id="desc"
                  name="description"
                  placeholder="Description here"
                  value={props.description}
                  onChange={(e) => props.setDescription(e.target.value)}
                  className={`${classes.inputIconDescription} ${classes.inputStyle} ${classes.detailtext}`}
                  style={{ marginBottom: '5px', marginRight: '10px' }}
                  disabled={enabledDisabled}
                />
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default MyProfileEdit;
