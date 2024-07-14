import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';

const SearchTagInput = (props) => {
  const [checkbox, setCheckbox] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedId, setSelectedId] = useState();
  const [selectedFirstName, setSelectedFirstName] = useState([]);
  const [selectedLastName, setSelectedLastName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedIsGroup, setSelectedIsGroup] = useState('');
  const [id, setId] = useState([]);
  const ids = [];

  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;

  const [getPlatData, setGetPlatData] = useState(null);

  const [searchInputEmpty, setSearchInputEmpty] = useState(true);

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
  let fruit = ['uu'];
  let ok = [];
  return (
    <>
      <Autocomplete
        onChange={(e, ids) => {
          setSelectedFirstName(e.target.textContent);
          props.setSearchInput(e.target.value);
          ids.length == 0 ? setSearchInputEmpty(true) : setSearchInputEmpty(false);
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
        multiple
        limitTags={2}
        className="mx-auto position-relative bottom-0 overflow-hidden"
        style={{ zIndex: '99999', maxHeight: '100px', width: '100%' }}
        id="checkboxes-tags-demo"
        options={props.forwardBriifData.users}
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
                            : `${awsLink}users/userProfile/${option.image}`
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
                value={id}
                icon={<span></span>}
                checkedIcon={<Image src="/assets/icons/new/check.png" alt="check" width="15px" height="15px" />}
                style={{ marginRight: 8 }}
                checked={selected}
                className=" justify-content-start"
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
                onChange={(e) => handleSearchInput(e)}
                style={{ minHeight: '40px', maxHeight: '75px' }}
                className="overflow-scroll medium-small"
                label=""
                placeholder={searchInputEmpty == false ? '' : 'Recipients Name'}
              />
            ) : (
              <TextField
                {...params}
                style={{ minHeight: '40px', maxHeight: '75px' }}
                className="overflow-scroll medium-small"
                label=""
              />
            )}
          </div>
        )}
      />
    </>
  );
};
export default SearchTagInput;
