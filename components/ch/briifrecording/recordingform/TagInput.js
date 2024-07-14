import React, { useEffect, useState } from 'react';
import Tag from './Tag';
import classes from '../../../kh_components/giistcreation/giistdetails/Stepper.module.css';
import { Chip } from '@mui/material';

const TagInput = (props) => {
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [input, setInput] = useState('');

  const onKeyDown = (e) => {
    // console.log("props =>0,", props.tags);
    let { key } = e;

    let trimmedInput = input
      .split(',')
      .filter((item) => item)
      .slice(0, 5 - props.tags.length);

    if (key == 'Enter' && trimmedInput.length && !props.tags.includes(input)) {
      e.preventDefault();
      props.setTags((prevState) => [...prevState, ...trimmedInput]);
      setInput('');
    }
    if (key == 'Backspace' && !input.length && props.tags.length && isKeyReleased) {
      const tagsCopy = [...props.tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      props.setTags(tagsCopy);
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const deleteTag = (index) => {
    props.setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };
  return (
    <>
      <div className="mt-0 ">
        {props.giiststags ? (
          <>
            <label
              htmlFor="description"
              className={
                props.giiststags
                  ? `${classes.myfont} d-inline border-0 pe-1`
                  : 'd-none border-0 medium-large bg-white pe-1 '
              }
            >
              Tags
            </label>
            <br />
          </>
        ) : (
          ''
        )}
        <div className={props.giiststags ? `${classes.title} row m-0` : `${classes.title} row mb-0`}>
          <input
            type="text"
            placeholder={props.giiststags ? 'Add tag' : 'Tags'}
            className={`mainborder'  ${classes.inputStyle} `}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            disabled={props.giiststags ? props.tags?.length >= 5 && true : props.tags?.length >= 5 && true}
            value={input}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
          {props.giiststags ? (
            <div className="d-flex align-items-center justify-content-between p-1" style={{ fontSize: '10px' }}>
              <span>Enter a comma after each tag</span>
              <span>{props.tags?.length}/5</span>
            </div>
          ) : (
            <div className="grey-view d-flex justify-content-end float-end w-100 mb-3" style={{ fontSize: '10px' }}>
              Write a tag and press enter
            </div>
          )}
        </div>
        {props.tags.map((tag, index) => (
          <Chip
            key={index}
            index={index}
            label={tag}
            onDelete={() => deleteTag(index)}
            sx={{
              marginLeft: '5px',
              marginBottom: '10px',
              '&:hover': { background: '#E8E8E8', color: '#FFFFFF' },
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TagInput;
