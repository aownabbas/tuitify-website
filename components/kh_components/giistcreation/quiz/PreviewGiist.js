import React, { useEffect, useState } from 'react';
import classes from './QuizCreation.module.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PreviewGiist = ({ chapterSingleData, setquizShow, setQuizTypeDefine, handleOpenDeleteModal }) => {
  let [timerVisible, setTimerVisible] = useState(false);
  let [timerValue, setTimerValue] = useState(0);
  function getQuizType(quizType) {
    switch (quizType) {
      case 1:
        return 'Simple Quiz';
      case 2:
        return 'Final Quiz';
      case 4:
        return 'Open Question';
      case 5:
        return 'Survey';
    }
  }
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes} min / ${seconds < 10 ? '0' : ''}${seconds} Sec `;
  };

  const handle = (chapterSingleData) => {
    if (chapterSingleData.timer > 0 || chapterSingleData.seconds > 0) {
      setTimerVisible(true);
      let m = chapterSingleData.timer * 60;
      let s = chapterSingleData.seconds;
      setTimerValue(m + s);
    }
  };

  useEffect(() => {
    setTimerVisible(false);
    handle(chapterSingleData?.quiz);
  }, [chapterSingleData]);

  const router = useRouter();

  const quizTypeLetter = getQuizType(chapterSingleData?.quiz?.quiz_type);

  return (
    <div
      style={{
        borderRadius: '10px',
        height: '400px',
        width: '100%',
        overflowY: 'scroll',
      }}
    >
      {chapterSingleData?.quiz?.questions.map((question, index) => {
        return (
          <div key={question.question_id}>
            <div
              style={{
                borderRadius: '10px',
                height: '400px',
                width: '100%',
                overflowY: 'scroll',
              }}
              className={`border col-12 p-4 ${classes.innerContainer} `}
            >
              {index == 0 && (
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Image src="/assets/icons/simpleQuiz.png" height={24} width={24} alt="simple quiz" />
                    <span className="semibold-large ms-1">{quizTypeLetter}</span>
                    <span className="ms-2">
                      {timerVisible && (
                        <div
                          className={` d-flex `}
                          style={{ background: '#FF4B55', borderRadius: '30px', padding: '5px' }}
                        >
                          <span
                            className="text-white"
                            style={{
                              letterSpacing: '0.9px',
                              fontWeight: '600',
                              fontSize: '12px',
                              lineHeight: '15px',
                            }}
                          >
                            {formatTime(timerValue)}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="ms-2">
                      <Image
                        src="/assets/images/edit-pencil.svg"
                        height={22}
                        width={22}
                        alt="cam icon"
                        onClick={() => {
                          setquizShow(true);
                          setQuizTypeDefine({ name: quizTypeLetter });
                        }}
                      />
                    </div>
                    <div className="ms-2">
                      <Image
                        src="/assets/icons/trashIcon.svg"
                        width={24}
                        height={24}
                        lt="cam icon"
                        onClick={() => handleOpenDeleteModal()}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="px-2">
                <div className="d-flex">
                  <div className="col-6">
                    <div className="mt-2 semibold"> Question {index == 0 ? 1 : index + 1}</div>
                  </div>
                  <div className="col-6">
                    <div className="float-end">
                      <p className="semibold p-1">{question.question_type}</p>
                    </div>
                  </div>
                </div>
                <div className="regular-small"></div>
                <div className="regular-small mt-2">Question</div>
                <div className={`border mt-2 w-100 ${classes.inputBorder}`}>
                  <input className="w-100 border-0 bg-white p-2" value={question.question} disabled />
                </div>
                <div>
                  {question.description !== '' && (
                    <>
                      <div className="regular-small mt-3">Explanation</div>
                      <div className={`border  mt-2 w-100  ${classes.inputBorder}`}>
                        <div className="w-100 d-flex align-questions-start p-2">
                          <textarea
                            style={{
                              height: '96px',
                              resize: 'none',
                              backgroundColor: 'white',
                            }}
                            type="text"
                            name="description"
                            className={`w-100 border-0  ${classes.textarea}`}
                            defaultValue={question.description}
                            disabled
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {question.question_type !== 'Paragraph' && (
                    <>
                      <div className="regular-small mt-3">Options</div>
                      {question?.options?.map((option) => {
                        console.log('option =>', option);
                        return (
                          <div className={`border mt-2 w-100 ${classes.inputBorder}`} key={option.option_id}>
                            <div className="d-flex py-1">
                              <div className="px-3 align-text-top">
                                {question?.question_type == 'Multiple Answers' ? (
                                  <input
                                    className="align-text-top"
                                    type="checkbox"
                                    style={{
                                      width: '18px',
                                      height: '18px',
                                      accentColor: '#353452',
                                    }}
                                    checked={option.correct_answer == 1}
                                  />
                                ) : (
                                  <input
                                    className="align-text-top"
                                    type="radio"
                                    style={{
                                      width: '18px',
                                      height: '18px',
                                      accentColor: '#353452',
                                    }}
                                    checked={option.correct_answer == 1}
                                  />
                                )}
                              </div>
                              <div className="w-100">
                                <input
                                  className="w-100 border-0 bg-white"
                                  name="answer"
                                  value={option.answer}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewGiist;
