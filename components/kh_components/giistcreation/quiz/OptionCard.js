import Image from 'next/image';
import React from 'react';
import classes from './QuizCreation.module.css';
import { Skeleton, Tooltip } from '@mui/material';
import GenericTooltip from '../../../ch/GenericTooltip';

const OptionCard = ({
  question,
  parentIndex,
  hanldeChangeTrueFalse,
  handleChangeOptions,
  handleChangeSelect,
  handleDeleteOption,
  setOptionId,
  handleCreateOptions,
  loading,
  selecedChapter,
  handleGetID,
  quizTypeDefine,
}) => {
  console.log('question.options.length', question.options);
  return (
    <>
      <div className="regular-small mt-3">Option</div>
      {question.options.length == 1 && question.question_type === 'True / False' ? (
        <div className="d-flex">
          <div className="d-flex p-3">
            {selecedChapter == parentIndex && loading ? (
              <Skeleton variant="circular" width={24} height={24} className="d-flex" />
            ) : (
              <input
                type="radio"
                name={`select${parentIndex}`}
                // onChange={() => hanldeChangeTrueFalse(parentIndex, question)}
                style={{
                  accentColor: '#353452',
                  width: '20px',
                  height: '20px',
                }}
                disabled
              />
            )}
            {selecedChapter == parentIndex && loading ? (
              <Skeleton
                variant="rectangular"
                width={40}
                height={20}
                style={{ borderRadius: '5px', marginLeft: '10px' }}
              />
            ) : (
              <label
                // htmlFor={`selectTrue${option.option_id}`}
                style={{ color: '#353452', marginLeft: '10px', cursor: 'pointer' }}
              >
                True
              </label>
            )}
          </div>
          <div className="d-flex p-3">
            {selecedChapter == parentIndex && loading ? (
              <Skeleton variant="circular" width={24} height={24} className="d-flex" />
            ) : (
              <input
                type="radio"
                name={`select${parentIndex}`}
                // onChange={() => hanldeChangeTrueFalse(parentIndex, question, 'false', option)}
                style={{
                  accentColor: '#353452',
                  width: '20px',
                  height: '20px',
                }}
                disabled

                // id={`selecteeri${option.option_id}`}
                // checked={option.answer == 'false' ? true : false}
              />
            )}
            {selecedChapter == parentIndex && loading ? (
              <Skeleton
                variant="rectangular"
                width={40}
                height={20}
                style={{ borderRadius: '5px', marginLeft: '10px' }}
                className="d-flex"
              />
            ) : (
              <label
                // htmlFor={`selecteeri${option.option_id}`}
                style={{ color: '#353452', marginLeft: '10px', cursor: 'pointer' }}
              >
                False
              </label>
            )}
          </div>
        </div>
      ) : (
        <div className={question.question_type === 'True / False' && 'd-flex align-items-center'}>
          {question?.options?.map((option, childIndex) => {
            if (question.question_type === 'True / False') {
              return (
                <div className="d-flex  align-items-start justify-content-start p-3 ">
                  <div className="d-flex align-items-center">
                    {selecedChapter == parentIndex && loading ? (
                      <Skeleton variant="circular" width={24} height={24} className="d-flex" />
                    ) : (
                      <input
                        type="radio"
                        name={`select${parentIndex}`}
                        onChange={() => {
                          quizTypeDefine?.name !== 'Survey' &&
                            hanldeChangeTrueFalse(parentIndex, childIndex, question, option);
                        }}
                        style={{
                          accentColor: '#353452',
                          width: '20px',
                          height: '20px',
                        }}
                        id={`selecteeri${option.option_id}`}
                        checked={quizTypeDefine?.name !== 'Survey' && option.correct_answer == 1}
                      />
                    )}
                    {selecedChapter == parentIndex && loading ? (
                      <Skeleton
                        variant="rectangular"
                        width={40}
                        height={20}
                        style={{ borderRadius: '5px', marginLeft: '10px' }}
                        className="d-flex"
                      />
                    ) : (
                      <label
                        htmlFor={`selecteeri${option.option_id}`}
                        style={{ color: '#353452', marginLeft: '10px', cursor: 'pointer' }}
                      >
                        {option.answer}
                      </label>
                    )}
                  </div>
                </div>
              );
            }
            return selecedChapter == parentIndex && loading ? (
              <Skeleton
                variant="rectangular"
                className="mt-3"
                width={'100%'}
                height={30}
                style={{ borderRadius: '5px' }}
              />
            ) : (
              <div className={`border mt-2  w-100 ${classes.inputBorder}`} key={childIndex}>
                <div className="d-flex align-items-center py-1">
                  <div className="px-3 align-text-top">
                    {question?.question_type === 'Multiple Answers' ? (
                      <input
                        className="align-text-top"
                        type="checkbox"
                        onChange={() => {
                          quizTypeDefine?.name !== 'Survey' &&
                            handleChangeSelect(parentIndex, childIndex, question, option);
                        }}
                        style={{
                          width: '18px',
                          height: '18px',
                          accentColor: '#353452',
                          cursor: 'pointer',
                          backgroundColor: 'red',
                          color: 'red',
                        }}
                        checked={option.correct_answer == 1}
                        disabled={!question.question || !option.answer}
                      />
                    ) : (
                      <input
                        className="align-text-top"
                        type="radio"
                        name="select"
                        onChange={() => {
                          quizTypeDefine?.name !== 'Survey' &&
                            handleChangeSelect(parentIndex, childIndex, question, option);
                        }}
                        style={{
                          width: '18px',
                          height: '18px',
                          accentColor: '#353452',
                          cursor: 'pointer',
                        }}
                        disabled={!question.question || !option.answer}
                        checked={option.correct_answer == 1}
                      />
                    )}
                  </div>
                  <div className="w-100">
                    <input
                      className=" border-0"
                      name="answer"
                      defaultValue={option?.answer}
                      placeholder="Type your option here"
                      onChange={(e) => handleChangeOptions(e, parentIndex, childIndex)}
                      // onBlur={() => handleGetID(parentIndex)}
                      onFocus={() => setOptionId(option?.option_id, parentIndex)}
                      onKeyPress={(event) =>
                        event.key === 'Enter' && handleCreateOptions(parentIndex, childIndex, question, option)
                      }
                      disabled={!question.question}
                    />
                  </div>
                  {!question.question || !option.answer ? (
                    ''
                  ) : (
                    <Tooltip title="Click and Update" placement="top">
                      <button className="border-0 bg-transparent d-flex mx-1" disabled={!question.question}>
                        <Image
                          src="/assets/icons/CheckIcon.svg"
                          width="22px"
                          height="22px"
                          onClick={() => handleCreateOptions(parentIndex, childIndex, question, option)}
                        />
                      </button>
                    </Tooltip>
                  )}

                  {childIndex == 0 ? (
                    ''
                  ) : (
                    <Image
                      src="/assets/icons/new/red_circle_cross.svg"
                      width="22px"
                      height="22px"
                      alt="cross"
                      onClick={() => handleDeleteOption(parentIndex, childIndex, option, question)}
                      disabled={!question.question}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default OptionCard;
