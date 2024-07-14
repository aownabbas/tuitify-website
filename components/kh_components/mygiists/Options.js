import React, { useState } from 'react';
import classes from './PlayGiistsVideo.module.css';

const Options = ({ currentQuestion, questions, selectedOptions, setSelectedOptions,ReviewGiist }) => {
  const selectOneOption = (id) => {
    let array = [];
    setSelectedOptions([]);
    array.push(id);
    setSelectedOptions(array);
  };

  const selectMultiOption = (id) => {
    let alreadySelectd = selectedOptions.find((item) => item === id);
    if (alreadySelectd) {
      let newArray = selectedOptions.filter((item) => item !== id);
      setSelectedOptions(newArray);
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };
// console.log(questions[0].options[0].correct_answer,"questions");
  return (
    <>
      {questions[currentQuestion]?.options?.map((answerOption) => {
        if (questions[currentQuestion]?.question_type == 'True / False') {
          return (
            <label
              className="col-12 mt-3 w-100"
              style={{ marginBottom: '10px', cursor: 'pointer' }}
              htmlFor={`select${answerOption.answer_id}`}
            >
              {ReviewGiist ==true ?
              <div className={classes.checkBox2}>
                <div className="d-flex py-1">
                  <div className="px-3 d-flex align-items-center">
                    <input
                      className={`align-text-center ${classes.checkbox}`}
                      type="radio"
                      style={{ width: '15px', height: '15px' }}
                      name="true/false"
                      value="true"
                      onChange={() => selectOneOption(answerOption.answer_id)}
                      id={`select${answerOption.answer_id}`}
                      checked={answerOption.correct_answer == 1 ? true : false}
                    />
                  </div>
                  <span>{answerOption.answer}</span>
                </div>
              </div>
              :
              <div className={classes.checkBox2}>
                <div className="d-flex py-1">
                  <div className="px-3 d-flex align-items-center">
                    <input
                      className={`align-text-center ${classes.checkbox}`}
                      type="radio"
                      style={{ width: '15px', height: '15px' }}
                      name="true/false"
                      value="true"
                      onChange={() => selectOneOption(answerOption.answer_id)}
                      id={`select${answerOption.answer_id}`}
                    />
                  </div>
                  <span>{answerOption.answer}</span>
                </div>
              </div>
        }
            </label>
          );
        }
        return (
          
          <label
            htmlFor={`select${answerOption.answer_id}`}
            className={`col-12 mt-3 w-100 `}
            style={{ cursor: 'pointer' }}
            key={answerOption.answer_id}
          >
            {ReviewGiist ==true ?
            <div className={classes.checkBox3}>
              <div className="d-flex py-1">
                <div className="px-3 d-flex align-items-center">
                  {questions[currentQuestion]?.question_type == 'One Answer' ? (
                    <input
                      className={`align-text-center ${classes.checkbox}`}
                      type="radio"
                      name="select"
                      style={{ width: '15px', height: '15px' }}
                      onChange={() => selectOneOption(answerOption.answer_id)}
                      id={`select${answerOption.answer_id}`}
                      checked={answerOption.correct_answer == 1 ? true : false}
                    />
                  ) : (

                    <input
                      className={`align-text-center ${classes.checkbox} `}
                      type="checkbox"
                      style={{ width: '15px', height: '15px' }}
                      onChange={() => {
                        selectMultiOption(answerOption.answer_id);
                      }}
                      id={`select${answerOption.answer_id}`}
                      checked={answerOption.correct_answer == 1 ? true : false}
                    />
                  )}
                </div>
                <label>{answerOption.answer}</label>
              </div>
            </div>
            :
            <div className={classes.checkBox3}>
              <div className="d-flex py-1">
                <div className="px-3 d-flex align-items-center">
                  {questions[currentQuestion]?.question_type == 'One Answer' ? (
                    <input
                      className={`align-text-center ${classes.checkbox}`}
                      type="radio"
                      name="select"
                      style={{ width: '15px', height: '15px' }}
                      onChange={() => selectOneOption(answerOption.answer_id)}
                      id={`select${answerOption.answer_id}`}
                    />
                  ) : (
                    <input
                      className={`align-text-center ${classes.checkbox} `}
                      type="checkbox"
                      style={{ width: '15px', height: '15px' }}
                      onChange={() => {
                        selectMultiOption(answerOption.answer_id);
                      }}
                      id={`select${answerOption.answer_id}`}
                    />
                  )}
                </div>
                <label>{answerOption.answer}</label>
              </div>
            </div>}
          </label>
        );
      })}
    </>
  );
};

export default Options;
