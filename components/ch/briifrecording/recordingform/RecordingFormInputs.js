import React, { useEffect, useState } from 'react';
import RecipientsFilterInput from './recipient_input/RecipientsFilterInput';
import classes from '../../../kh_components/giistcreation/giistdetails/Stepper.module.css';
//recipients input field ki imports
import SearchTagInput from './SearchTagInput';
import TagInput from './TagInput';
import SetAudience from '../../../combine/audience/SetAudience';

const RecordingFormInputs = (props) => {
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [showAudience, setShowAudience] = useState(false);
  const [audienceUser, setAudienceUser] = useState(null);
  const [allGroups, setAllGroups] = useState(null);
  const [platformData, setPlatformData] = useState('');
  const handleCheckboxChange = (event) => {
    if (event.target.id == '1') {
      props.setCheckedGroups([]);
      props.setCheckedUsers([]);
    }
    props.setSelectedCheckbox(event.target.id);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      props.setTitleError('');
    }, 5000);
    return () => setTimeout(timer);
  }, []);

  return (
    <>
      <label className={`${classes.myfont} py-1`}>
        Title <span className="text-danger">*</span>
      </label>
      <div className={props.titleError != '' ? 'input-group mb-1' : 'input-group mb-1'}>
        <input
          id="title"
          type="text"
          placeholder="Enter briif title"
          value={props.title}
          style={{ fontSize: '14px', color: '#141D19', lineHeight: '17px' }}
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          onChange={(e) => {
            props.setTitle(e.target.value);
          }}
          className={classes.inputStyle}
        />
      </div>
      <p className="text-danger">{props.titleError}</p>
      <div className="col-md-12 col-sm-12 ">
        <h6 className="semibold-large m-0 mt-2">Add Recipients</h6>
        <p className="regular-xsmall m-0">Choose the Recipients who have the right to see your briif</p>
      </div>
      <div className="w-100 mt-2">
        <label className={`${classes.myfont} m-0 p-0`}>Recipients Names</label>
        <SetAudience
          Recipient={true}
          setShowAudience={setShowAudience}
          showAudience={showAudience}
          selectedGroup={selectedGroup}
          setSelectedUsers={setSelectedUsers}
          setSelectedGroup={setSelectedGroup}
          selectedUsers={selectedUsers}
          setAudienceUser={setAudienceUser}
          audienceUser={audienceUser}
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          platformData={platformData}
          checkedUsers={props.checkedUsers}
          checkedGroups={props.checkedGroups}
          setCheckedGroups={props.setCheckedGroups}
          setCheckedUsers={props.setCheckedUsers}
          selectedCheckbox={props.selectedCheckbox}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      <label className={`${classes.myfont} py-1 m-0`}>Description</label>
      <span className="grey-view my-2 align-items-center medium-large">(optional)</span>
      <div className={`${classes.description}  row m-0`}>
        <textarea
          name="textarea"
          placeholder="write here..."
          className={`${classes.descriptionBorder} py-2`}
          onChange={(e) => {
            props.setDescription(e.target.value);
          }}
          style={{ resize: 'none' }}
          value={props.description}
          cols={80}
          rows={3}
        />
      </div>
    </>
  );
};

export default RecordingFormInputs;
