import classes from "./Setting.module.css";
import React from "react";
import Image from "next/image";
import { useState } from "react";

const NOtification = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const handleChange = () => {
      setIsChecked(!isChecked);
    };
    const handleCheck = () => {
        setIsCheck(!isCheck);
      };
  
    const backgroundStyle = isChecked
      ? {
          background: 'linear-gradient(131.85deg, #D51AFF -19.16%, #4E6AFE 58.53%, #8BF3FE 135.61%)',
        }
      : {
          background: '#EBECF0',
        };
        const backgroundStyles = isCheck
        ? {
            background: 'linear-gradient(131.85deg, #D51AFF -19.16%, #4E6AFE 58.53%, #8BF3FE 135.61%)',
          }
        : {
            background: '#EBECF0',
          };
  
  return (
    <div className="col-md-12 col-12 col-sm-12 w-100">
      <div className={classes.whiteBox2}>
        <div className="col-md-12 d-flex">
          <div className="col-md-7 p-2">
            <h2 className="p-2" style={{ minWidth: "165px" }}>
              Notification Settings
            </h2>
            <p className="p-2" style={{ minWidth: "450px" }}>
              you can turn on and off the notifications
            </p>
          </div>
        </div>
        <div style={{ opacity: "0.1", border: "1px solid #000000" }}></div>
        <div className="col-md-12 col-sm-12 col-12 mt-4 w-100 ">
          <div className="row w-100 m-0 p-2">
            <div className={`col-md-7 ${classes.comment}`}>
              <h1>Comments</h1>
              <p>these are notifications for comments</p>
            </div>
            <div className="col-md-5 d-flex justify-content-end align-items-center">
              <div className={classes.toggleSwitch}>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                  />
                  <span className={classes.slider} style={backgroundStyle} />
                </label>
              </div>
            </div>
          </div>
          <div className="row w-100 m-0 p-2 col-12">
          <div style={{ opacity: "0.1", border: "1px solid #000000" }}></div>
          </div>
          <div className="row w-100 m-0 p-2">
            <div className={`col-md-7 ${classes.comment}`}>
              <h1>Tags</h1>
              <p>these are notifications for tags</p>
            </div>
            <div className="col-md-5 d-flex justify-content-end align-items-center">
              <div className={classes.toggleSwitch}>
                <label>
                  <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={handleCheck}
                  />
                  <span className={classes.slider} style={backgroundStyles} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NOtification;
