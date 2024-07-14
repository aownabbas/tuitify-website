import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';

const SearchTagInput = (props) => {
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const [checkbox, setCheckbox] = useState(false);
  const handleToggleCheckbox = (e, selected, id) => {
    if (selected === true) {
      console.log(id);
    } else {
    }
  };
  const [searchInput, setSearchInput] = useState('');
  const [selectedId, setSelectedId] = useState();
  const [selectedFirstName, setSelectedFirstName] = useState([]);
  const [selectedLastName, setSelectedLastName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedIsGroup, setSelectedIsGroup] = useState('');
  const [id, setId] = useState([]);
  const ids = [];

  const [searchInputEmpty, setSearchInputEmpty] = useState(true);

  const [getPlatData, setGetPlatData] = useState(null);

  useEffect(() => {
    const GetPlatData = JSON.parse(localStorage.getItem('@GetPlatData'));

    if (GetPlatData) {
      const getPlatObject = GetPlatData;
      setGetPlatData(getPlatObject);
    }

    return () => {};
  }, []);

  const handleId = (selectedId) => {
    for (var i = 1; i == 1; i++) {
      ids.push(selectedId);
    }
  };

  const handleSearchInput = (e) => {
    props.setSearchInput(e.target.value);
    setSearchInput(e.target.value);
  };

  return (
    <Autocomplete
      onChange={(e, ids) => {
        ids.length == 0 ? setSearchInputEmpty(true) : setSearchInputEmpty(false);
        props.setError('');
        setSelectedFirstName(e.target.textContent);
        props.setSearchInput(e.target.value);
        const idArray = [];
        const groupArray = [];
        for (var i = 0; i < ids.length; i++) {
          if (ids[i].is_group == false) {
            const isId = ids[i].id;
            idArray.push(isId);
          }
          if (ids[i].is_group == true) {
            const groupTrueId = ids[i].id;
            groupArray.push(groupTrueId);
          }
        }
        props.setUsersId(idArray);
        props.setGroupsId(groupArray);
      }}
      sx={{ width: '500px' }}
      multiple
      limitTags={2}
      className="mx-auto position-relative bottom-0"
      style={{ zIndex: '99999', overflow: 'auto', maxHeight: '100px', width: '100%' }}
      id="checkboxes-tags-demo"
      options={props.ForwardBriifData.users.items}
      disableCloseOnSelect
      getOptionLabel={(option) => (option.id, option.first_name)}
      renderOption={(props, option, { selected }) => (
        setSelectedId(option.id),
        (
          <li {...props} key={option.id} className="d-flex">
            {selected && handleId(option.id)}
            <span className="d-none">{option.id}</span>
            <span className="flex-grow-1 ps-3 py-2 d-flex align-items-center">
              {option.image != null ? (
                option.is_group == false ? (
                  <Image
                    src={
                      getPlatData
                        ? getPlatData == (null || {})
                          ? ''
                          : `${awsLink}users/profileImages/${option.image}`
                        : '/assets/icons/new/user.svg'
                    }
                    width="18px"
                    className="rounded-circle"
                    height="18px"
                    alt="user"
                  />
                ) : (
                  <Image
                    src={`https://tuityxelor.s3.amazonaws.com/groups/${option.image}`}
                    width="18px"
                    className="rounded-circle"
                    height="18px"
                    alt="group"
                  />
                )
              ) : (
                <Image
                  src="/assets/icons/new/user.svg"
                  width="18px"
                  className="rounded-circle"
                  height="18px"
                  alt="user"
                />
              )}
              <span className="ms-2 medium-small">{option.first_name}</span>
            </span>
            <Checkbox
              onChange={(e, selected, id) => handleToggleCheckbox(e, selected, id)}
              value={id}
              icon={<span></span>}
              checkedIcon={<Image src="/assets/icons/new/check.png" alt="check" width="15px" height="15px" />}
              style={{ marginRight: '8' }}
              checked={selected}
              className="justify-content-end"
            />
          </li>
        )
      )}
      renderInput={(params) => (
        <div>
          {props.searchInput !== '' ? (
            <TextField
              {...params}
              variant="standard"
              inputProps={{
                ...params.inputProps,
              }}
              onChange={(e) => {
                handleSearchInput(e);
              }}
              style={{ minHeight: '20px', maxHeight: '90px' }}
              className="overflow-auto medium-small"
              label=""
              placeholder={searchInputEmpty == false ? '' : 'Recipients Name'}
            />
          ) : (
            <TextField
              {...params}
              onChange={(e) => {}}
              style={{ minHeight: '50px', maxHeight: '140px' }}
              className="overflow-scroll medium-small"
              label=""
            />
          )}
        </div>
      )}
    />
  );
};
export default SearchTagInput;
