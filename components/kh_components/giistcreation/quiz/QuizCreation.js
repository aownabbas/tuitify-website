import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classes from './QuizCreation.module.css';
import { useDispatch } from 'react-redux';
import KH_CreateQuiz from '../../../../redux/actions/Kh_Quiz';
import QuizCard from './QuizCard';
import Skeleton from '@mui/material/Skeleton';
import QuizSettingsModal from '../../../modals/quizSettingsModal/quizSettingsModal';
import kh_QuizQuestionDelete, { kh_QuizOptionDelete } from '../../../../redux/actions/kh_QuizDelete';
import { Autocomplete } from '@mui/material';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import SuccessModal from '../../../modals/simplemodal/SuccessModal';

function QuizCreation({
  loginData,
  detailCreationRes,
  setquizShow,
  subChapterResObj,
  setLoading,
  loading,
  chapterIdSingle,
  setDisplayAnswer,
  setQuestionDisplay,
  questionDisplay,
  displayAnswer,
  quizTypeDefine,
  chaptersCreateRes,
  setChaptersCreateRes,
  handleDeleteQuiz,
  subindexForMedia,
  indexForMedia,
}) {
  const [questions, setQuestions] = useState([]);
  const [setId, setSetId] = useState('');
  const [setquestionId, setSetquestionId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [deleteQuizModal, setDeleteQuizModal] = useState(false);
  const [quizSettingModal, setQuizSettingModal] = useState(false);
  const [quizDeleteModal, setQuizDeleteModal] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleOpenModal = () => setDeleteQuizModal(true);
  const handleCloseModal = () => setDeleteQuizModal(false);

  const handleOpenQuizModal = () => setQuizSettingModal(true);
  const handleCloseQuizModal = () => setQuizSettingModal(false);

  const handleOpenDeleteModal = () => setQuizDeleteModal(true);
  const handleCloseDeleteModal = () => setQuizDeleteModal(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [optionDisabled, setOptionDisabled] = useState(false);
  const [addQuestionDisabled, setAddQuestionDisabled] = useState(true);

  const [selecedChapter, setSelecedChapter] = useState(0);

  useEffect(() => {
    const isDisabled = questions.some((question) => {
      if (!question.question) {
        setAddQuestionDisabled(true);
        return true;
      } else {
        setAddQuestionDisabled(false);
        if (question.question_type !== 'Paragraph') {
          if (quizTypeDefine?.name == 'Survey') {
            const hasValidOption = question.options.some((option) => {
              return option.answer && option.answer.trim() !== '';
            });
            return !hasValidOption;
          } else {
            const hasValidOption = question.options.some((option) => {
              return option.answer && option.answer.trim() !== '' && option.correct_answer === 1;
            });
            return !hasValidOption;
          }
        }
        return false;
      }
    });
    setButtonDisabled(isDisabled);
  }, [questions]);

  const dispatch = useDispatch();

  // add new Questions onClick button in array
  const AddNewQusetions = () => {
    let myQusetions = [...questions];
    myQusetions.push({
      id: myQusetions.length + 1,
      description: '',
      question: '',
      options: [{ id: 1, answer: '', correct_answer: 0 }],
      question_type: quizTypeDefine?.name == 'Open Question' ? 'Paragraph' : 'Multiple Answers',
      question_type_number: quizTypeDefine?.name == 'Open Question' ? 5 : 1,
      question_disabled: false,
      addExplanationShow: false,
    });
    setQuestions(myQusetions);
  };

  const handleGetID = (id, parentIndex) => {
    setSetquestionId(id);
  };

  // handleChange Function input value change
  const handleChangeValues = (e, parentIndex) => {
    let NewQuestions = [...questions];
    const { name, value } = e.target;
    NewQuestions[parentIndex][name] = value;
  };

  //Success response from DataBase
  const onQuizSubmitSuccess = (res) => {
    setChaptersCreateRes(res);
    setLoading(false);
    setLoadingTimer(false);
  };

  //Error response from DataBase
  const onQuizSubmitError = (res) => {
    setLoading(false);
    setLoadingTimer(false);
  };

  const handleFetchData = () => {
    let findSingleItem = chaptersCreateRes?.data?.chapters.find(
      (chapter) => chapter.chapter_id == chapterIdSingle.chapter_id,
    );
    setSetId(findSingleItem?.quiz?.quiz_id);
    setMinutes(findSingleItem?.quiz?.timer);
    setSeconds(findSingleItem?.quiz?.seconds);
    if (findSingleItem?.subChapters.length > 0) {
      let fineSingleSubChap = findSingleItem?.subChapters.find(
        (subChap) => subChap.chapter_id == subChapterResObj?.chapter_id,
      );
      setSetId(fineSingleSubChap?.quiz?.quiz_id);
      setMinutes(fineSingleSubChap?.quiz?.timer);
      setSeconds(fineSingleSubChap?.quiz?.seconds);
      if (!fineSingleSubChap?.quiz?.questions.length) {
        setLoading(true);
        let myQuestions = [];
        myQuestions.push({
          id: 1,
          description: '',
          question: '',
          options: [{ id: 1, answer: '', correct_answer: 0 }],
          question_type: quizTypeDefine?.name == 'Open Question' ? 'Paragraph' : 'Multiple Answers',
          question_type_number: quizTypeDefine?.name == 'Open Question' ? 5 : 1,
          question_disabled: false,
          addExplanationShow: false,
        });
        setQuestions(myQuestions);
        setLoading(false);
      } else {
        let questionsData = fineSingleSubChap?.quiz?.questions;
        questionsData?.map((question) => {
          if (!question.options.length) {
            question.options.push({
              id: 1,
              answer: '',
              correct_answer: 0,
              option_disabled: true,
            });
            question.question_disabled = true;
          }
          if (question.question_type == 1) {
            question.question_type = 'Multiple Answers';
            question.question_disabled = true;
          } else if (question.question_type == 2) {
            question.question_type = 'One Answer';
            question.question_disabled = true;
          } else if (question.question_type == 3) {
            question.question_type = 'True / False';
            question.question_disabled = true;
          } else if (question.question_type == 5) {
            question.question_type = 'Paragraph';
            question.question_disabled = true;
          }
          return question;
        });
        setQuestions(questionsData);
      }
    } else {
      if (!findSingleItem?.quiz?.questions.length) {
        setLoading(true);
        let myQuestions = [];
        myQuestions.push({
          id: 1,
          description: '',
          question: '',
          options: [{ id: 1, answer: '', correct_answer: 0 }],
          question_type: quizTypeDefine?.name == 'Open Question' ? 'Paragraph' : 'Multiple Answers',
          question_type_number: quizTypeDefine?.name == 'Open Question' ? 5 : 1,
          question_disabled: false,
          addExplanationShow: false,
        });
        setQuestions(myQuestions);
        setLoading(false);
      } else {
        let questionsData = findSingleItem?.quiz?.questions;
        questionsData?.map((question) => {
          if (!question.options.length) {
            question.options.push({
              id: 1,
              answer: '',
              correct_answer: 0,
            });
            question.question_disabled = true;
          }
          if (question.question_type == 1) {
            question.question_type = 'Multiple Answers';
            question.question_disabled = true;
          } else if (question.question_type == 2) {
            question.question_type = 'One Answer';
            question.question_disabled = true;
          } else if (question.question_type == 3) {
            question.question_type = 'True / False';
            question.question_disabled = true;
          } else if (question.question_type == 5) {
            question.question_type = 'Paragraph';
            question.question_disabled = true;
          }
          return question;
        });
        setQuestions(questionsData);
      }
    }
  };

  // get response data when call Api
  useEffect(() => {
    handleFetchData();
  }, [chaptersCreateRes?.data]);

  // send body data in DataBase
  const handleQuizCreate = (parentIndex) => {
    let data = questions[parentIndex];
    if (!data?.question) {
      return;
    }
    setLoading(true);
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapterIdSingle?.chapter_id,
        quiz: {
          quiz_id: setId,
          question: {
            question: data?.question,
            question_type: data?.question_type_number,
            question_id: setquestionId,
          },
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const handleCreateDescription = (parentIndex, question) => {
    console.log(chaptersCreateRes, parentIndex);
    if (!chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters.length) {
      handleCreateDescriptions(parentIndex, question);
    } else {
      handleCreateSubDescriptions(parentIndex, question);
    }
  };

  const handleCreateSubDescriptions = (parentIndex, question) => {
    let data = questions[parentIndex];
    if (!data?.description) {
      return;
    }
    setLoading(true);
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: subChapterResObj?.chapter_id,
        quiz: {
          quiz_id: setId,
          question: {
            description: data?.description,
            question_id: question.question_id,
          },
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const handleCreateDescriptions = (parentIndex, question) => {
    let data = questions[parentIndex];
    if (!data?.description) {
      return;
    }
    setLoading(true);
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapterIdSingle?.chapter_id,
        quiz: {
          quiz_id: setId,
          question: {
            description: data?.description,
            question_id: question.question_id,
          },
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const handleCreateOptions = (parentIndex, childIndex, question, option) => {
    console.log(chaptersCreateRes, parentIndex);
    if (!chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters.length) {
      handleCreateOption(parentIndex, childIndex, question, option);
    } else {
      handleSubCreateOption(parentIndex, childIndex, question, option);
    }
  };

  const handleSubCreateOption = (parentIndex, childIndex, question, option) => {
    let optionData = questions[parentIndex].options[childIndex];
    if (!optionData?.answer) {
      return;
    }
    setLoading(true);
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: subChapterResObj?.chapter_id,
        quiz: {
          quiz_id: setId,
          question: {
            question_id: question?.question_id,
            option: {
              option_id: option?.option_id,
              answer: optionData?.answer,
              correct_answer: optionData?.correct_answer,
            },
          },
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const handleCreateOption = (parentIndex, childIndex, question, option) => {
    let optionData = questions[parentIndex].options[childIndex];
    if (!optionData?.answer) {
      return;
    }
    setLoading(true);
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapterIdSingle?.chapter_id,
        quiz: {
          quiz_id: setId,
          question: {
            question_id: question?.question_id,
            option: {
              option_id: option?.option_id,
              answer: optionData?.answer,
              correct_answer: optionData?.correct_answer,
            },
          },
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  const handleCreateSettingQuiz = () => {
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: chapterIdSingle?.chapter_id,
        quiz: {
          quiz_id: setId,
          question_display: questionDisplay,
          display_answer: displayAnswer,
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
    setSetquestionId('');
    handleCloseQuizModal();
  };

  const hanldeChangeTrueFalse = (parentIndex, childIndex, question, option) => {
    let myQuestions = [...questions];
    let ques = myQuestions[parentIndex];
    ques.options[childIndex].correct_answer = 1;
    myQuestions[parentIndex] = ques;
    setQuestions(myQuestions);
    handleCreateOptions(parentIndex, childIndex, question, option);
  };

  const handleCreateSubQuestion = (parentIndex) => {
    let data = questions[parentIndex];
    if (!data?.question) {
      return;
    }
    setLoading(true);
    let paramsQuiz = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: subChapterResObj?.chapter_id,
        quiz: {
          quiz_id: setId,
          question: {
            question: data?.question,
            question_type: data?.question_type_number,
            question_id: setquestionId,
          },
        },
      },
    };
    dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
  };

  // add data in Database useing onfocus
  const handleFocus = (parentIndex) => {
    console.log(chaptersCreateRes, parentIndex);
    if (!chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters.length) {
      handleQuizCreate(parentIndex);
    } else {
      handleCreateSubQuestion(parentIndex);
    }
  };

  const handleAddExplanationShow = (parentIndex) => {
    let arrayQuestions = [...questions];
    let getSingleQuestion = arrayQuestions[parentIndex];
    getSingleQuestion.addExplanationShow = true;
    setQuestions(arrayQuestions);
  };

  const handleHideExplanationShow = (parentIndex, question) => {
    // setLoading(true);
    let arrayQuestions = [...questions];
    let getSingleQuestion = arrayQuestions[parentIndex];

    if (getSingleQuestion.description) {
      let paramsQuiz = {
        id: detailCreationRes?.id,
        chapter: {
          chapter_id: chapterIdSingle?.chapter_id,
          quiz: {
            quiz_id: setId,
            question: {
              description: '',
              question_id: question.question_id,
            },
          },
        },
      };
      dispatch(KH_CreateQuiz(paramsQuiz, loginData?.access_token, onQuizSubmitSuccess, onQuizSubmitError));
    }
    getSingleQuestion.addExplanationShow = false;
    setQuestions(arrayQuestions);
  };

  const handleChangeSelect = (parentIndex, childIndex, question, option) => {
    let questionsArr = [...questions];
    let que = questionsArr[parentIndex];
    que.options[childIndex].correct_answer = que.options[childIndex]?.correct_answer == 0 ? 1 : 0;
    setQuestions(questionsArr);
    handleCreateOptions(parentIndex, childIndex, question, option);
  };

  // Delete options one by one
  const handleDeleteOption = (parentIndex, childIndex, option, question) => {
    setLoading(true);
    const questionsArray = [...questions];
    let paramsQuizOptions = {
      option_id: option?.option_id,
      question_id: question?.question_id,
    };
    dispatch(kh_QuizOptionDelete(paramsQuizOptions, loginData?.access_token, onQuizDeleteSuccess, onQuizDeleteError));
    let op = questionsArray[parentIndex];
    op.options?.splice(childIndex, 1);
    setQuestions(questionsArray);
  };

  const handleDeleteQusetions = (question) => {
    let { question_id } = question;
    setLoading(true);
    let paramsQuizquestions = {
      quiz_id: setId,
      question_id: question_id,
    };
    dispatch(
      kh_QuizQuestionDelete(
        paramsQuizquestions,
        loginData?.access_token,
        onQuizDeleteSuccess,
        onQuizDeleteError,
        question_id,
      ),
    );
  };

  const handleAnswerType = (parentIndex, value, number, question) => {
    let { question_id } = question;
    let questionsArray = [...questions];
    let ques = questionsArray[parentIndex];
    ques.question_type = value;
    (ques.question_type_number = number), (questionsArray[parentIndex] = ques);
    setQuestions(questionsArray);
    if (ques.question_disabled == true) {
      setLoading(true);
      let paramsQuizquestions = {
        quiz_id: setId,
        question_id: question_id,
      };
      dispatch(
        kh_QuizQuestionDelete(
          paramsQuizquestions,
          loginData?.access_token,
          onQuizDeleteSuccess,
          onQuizDeleteError,
          question_id,
        ),
      );
      questionsArray.splice(parentIndex, 1);
      setQuestions(questionsArray);
      return;
    }
  };

  const onQuizDeleteSuccess = (res, question_id) => {
    if (res.status == true) {
      let newArray = questions.filter((item) => item.question_id != question_id);
      console.log('newArray', newArray);
      setQuestions(newArray);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const onQuizDeleteError = (error) => {
    console.log('Error sdkjjksjkjk=>', error);
    setLoading(false);
  };

  const handleChangeQuestion = (value) => {
    setQuestionDisplay(value);
  };

  const handleChangeAnswer = (value) => {
    setDisplayAnswer(value);
  };

  // Time Get
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const [loadingTimer, setLoadingTimer] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Remove the error message after 3 seconds
    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleCreateTimer = () => {
    if ((minutes == 0 && seconds == 0) || seconds == '' || minutes == '') {
      return setError('Invalid input values for minutes and/or seconds.');
    }
    setLoading(true);
    setLoadingTimer(true);
    let timerParams = {
      id: detailCreationRes?.id,
      chapter: {
        chapter_id: !chaptersCreateRes?.data?.chapters[indexForMedia]?.subChapters.length
          ? chapterIdSingle?.chapter_id
          : subChapterResObj?.chapter_id,
        quiz: {
          quiz_id: setId,
          timer: minutes,
          seconds: seconds,
        },
      },
    };
    dispatch(KH_CreateQuiz(timerParams, loginData?.access_token, onQuizSubmitSuccessTimer, onQuizSubmitErrorTimer));
  };

  const onQuizSubmitSuccessTimer = (res) => {
    if (res.status == true) {
      setquizShow(false);
      setLoadingTimer(false);
      setChaptersCreateRes(res);
      setLoading(false);
    }
  };
  const onQuizSubmitErrorTimer = (error) => {
    console.log(error);
    setLoadingTimer(false);
    setLoading(false);
  };
  const handleBackQuiz = (setId) => {
    handleDeleteQuiz(setId);
  };
  const handleFinish = () => {
    if (buttonDisabled) {
      setAlertError(true);
    } else if (quizTypeDefine?.name == 'Final Quiz') {
      if ((minutes == 0 && seconds == 0) || seconds == '' || minutes == '') {
        return setError('Invalid input values for minutes and/or seconds.');
      }
      handleCreateTimer();
    } else {
      setquizShow(false);
    }
  };

  let timeSlots = [];
  for (let i = 0; i <= 59; i++) {
    timeSlots.push(i.toString());
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-lg-8 offset-lg-2 offset-1 p-0  d-flex align-items-center">
          <Image
            src="/assets/icons/arrow-left.svg"
            alt="back icon"
            height={24}
            width={24}
            onClick={() => handleOpenDeleteModal()}
          />
          <span style={{ fontSize: '20px', fontWeight: '600', padding: '10px' }}>Create Giist</span>
        </div>
        <div className={`border col-10 col-lg-8 offset-lg-2 offset-1 mt-2 ${classes.quizContainer}`}>
          <div className="semibold-xlarge text-center mt-3">1. Introduction</div>

          <div className="row">
            <hr className="px-0 mt-3"></hr>
          </div>
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="d-flex align-items-center">
                  <Image src="/assets/icons/simpleQuiz.png" height={24} width={24} alt="simple quiz" />
                  <span className="semibold-large ms-1">{quizTypeDefine?.name}</span>
                </div>

                <span className="p-2 fs-6 ">Note: There will be unlimited attempts for {quizTypeDefine?.name}</span>
              </div>
              {/* <div className="d-flex align-items-center">
                <span className="me-1">Quiz Settings</span>
                <Image
                  src="/assets/icons/setting-2.svg"
                  height={20}
                  width={20}
                  alt="quizSetting quiz"
                  onClick={handleOpenQuizModal}
                />
              </div> */}
            </div>
            {questions?.map((question, parentIndex) => {
              return (
                <QuizCard
                  key={question.question_id}
                  question={question}
                  parentIndex={parentIndex}
                  setQuestions={setQuestions}
                  handleDeleteOption={handleDeleteOption}
                  handleFocus={handleFocus}
                  questions={questions}
                  handleChangeValues={handleChangeValues}
                  handleAddExplanationShow={handleAddExplanationShow}
                  handleHideExplanationShow={handleHideExplanationShow}
                  handleChangeSelect={handleChangeSelect}
                  handleDeleteQusetions={handleDeleteQusetions}
                  deleteQuizModal={deleteQuizModal}
                  handleCloseModal={handleCloseModal}
                  handleOpenModal={handleOpenModal}
                  hanldeChangeTrueFalse={hanldeChangeTrueFalse}
                  handleGetID={handleGetID}
                  handleCreateOptions={handleCreateOptions}
                  setOptionId={setOptionId}
                  handleCreateDescription={handleCreateDescription}
                  quizTypeDefine={quizTypeDefine}
                  handleAnswerType={handleAnswerType}
                  buttonDisabled={buttonDisabled}
                  optionDisabled={optionDisabled}
                  loading={loading}
                  selecedChapter={selecedChapter}
                  setSelecedChapter={setSelecedChapter}
                />
              );
            })}
          </>

          <div className="row mt-4 mb-3 me-2 d-flex align-items-center justify-content-end">
            <div className="col-lg-5 col-xl-4 col-md-5">
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  className="w-100 mb-3 mb-md-0  d-flex align-items-center justify-content-center"
                  height={40}
                  style={{ borderRadius: '5px' }}
                />
              ) : (
                <button
                  className="w-100 mb-3 mb-md-0  d-flex align-items-center justify-content-center"
                  onClick={() => AddNewQusetions()}
                  style={{
                    height: '38px',
                    cursor: 'pointer',
                    border: '1px solid #353452',
                    borderRadius: '10px',
                    opacity: addQuestionDisabled ? 0.2 : 1,
                  }}
                  disabled={addQuestionDisabled}
                >
                  <Image src="/assets/icons/addMoreQuestion.png" height={22} width={22} alt="Add explaination" />
                  <span className="ms-2 border-0">Add question</span>
                </button>
              )}
            </div>
            <QuizSettingsModal
              handleCloseModal={handleCloseQuizModal}
              openModal={quizSettingModal}
              setDisplayAnswer={setDisplayAnswer}
              setQuestionDisplay={setQuestionDisplay}
              handleChangeQuestion={handleChangeQuestion}
              handleChangeAnswer={handleChangeAnswer}
              handleCreateSettingQuiz={handleCreateSettingQuiz}
              questionDisplay={questionDisplay}
              displayAnswer={displayAnswer}
            />
          </div>
        </div>
      </div>
      {quizTypeDefine?.name == 'Final Quiz' && (
        <div className="row">
          <div className={` border col-10 col-lg-8 offset-lg-2 offset-1 mt-2 p-2 ${classes.quizContainer}`}>
            <div className="d-flex align-items-center justify-content-between">
              <span
                style={{
                  fontWeight: '600',
                  lineHeight: '25px',
                  fontSize: '20px',
                }}
              >
                Display Questions Time
              </span>
            </div>
            <div className={`border mt-2 col-12 ${classes.innerContainer}`}>
              <div className="d-flex align-items-center justify-content-center" style={{ padding: '20px' }}>
                {loadingTimer ? (
                  <Skeleton
                    variant="rectangular"
                    className="me-4"
                    height={40}
                    width={200}
                    style={{ borderRadius: '5px' }}
                  />
                ) : (
                  <label className="me-4">
                    <Autocomplete
                      sx={{
                        display: 'inline-block',
                        '& input': {
                          width: 200,
                          bgcolor: 'background.paper',
                          color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
                        },
                      }}
                      id="custom-input-demo"
                      options={timeSlots}
                      value={minutes}
                      inputValue={minutes}
                      onInputChange={(event, newInputValue) => {
                        setMinutes(newInputValue);
                      }}
                      getOptionLabel={(option) => String(option)}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                          <input
                            type="text"
                            {...params.inputProps}
                            style={{
                              border: '1px solid #dee2e6',
                              borderRadius: '8px',
                              padding: '8px',
                            }}
                            maxLength={2}
                          />
                          <span style={{ position: 'absolute', top: '8px', right: '10px' }}>Minutes</span>
                        </div>
                      )}
                    />
                  </label>
                )}
                {loadingTimer ? (
                  <Skeleton variant="rectangular" height={40} width={200} style={{ borderRadius: '5px' }} />
                ) : (
                  <label>
                    <Autocomplete
                      sx={{
                        display: 'inline-block',
                        '& input': {
                          width: 200,
                          bgcolor: 'background.paper',
                          color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
                        },
                      }}
                      value={seconds}
                      inputValue={seconds}
                      onInputChange={(event, newInputValue) => {
                        setSeconds(newInputValue);
                      }}
                      id="custom-input-demo2"
                      options={timeSlots}
                      getOptionLabel={(option) => String(option)}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                          <input
                            type="text"
                            {...params.inputProps}
                            style={{
                              border: '1px solid #dee2e6',
                              borderRadius: '8px',
                              padding: '8px',
                            }}
                            maxLength={2}
                          />
                          <span style={{ position: 'absolute', top: '8px', right: '10px' }}>Second</span>
                        </div>
                      )}
                    />
                  </label>
                )}

                {/* <div className="ms-3">
                  <button
                    className="main-background-color text-white mainborder px-2 regular-mid rounded"
                    style={{ cursor: 'pointer', letterSpacing: '2px' }}
                    onClick={() => handleCreateTimer()}
                  >
                    Set Time
                  </button>
                </div> */}
              </div>
              <p className="text-danger text-center mb-0">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="text-end mt-2 col-10 col-lg-8 offset-lg-2 offset-1 p-4">
        <button
          className="main-background-color text-white mainborder p-2 px-5 regular-mid rounded "
          style={{ cursor: 'pointer', letterSpacing: '2px', mr: 1, borderRadius: '10px', fontSize: '24px' }}
          onClick={() => handleFinish()}
        >
          Finish
        </button>
      </div>
      <SuccessModal
        modalOpen={alertError}
        handleModalClose={() => {
          setAlertError(false);
        }}
        image={<Image src="/assets/icons/new/red_alert.svg" width="65px" height="70px" alt="alert" />}
        title={'Something went wrong'}
        description={'Please make sure all the answers are selected'}
        button1={'Try again'}
      />

      <DummyDeleteModal
        openModal={quizDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        image={'/assets/images/trash.svg'}
        heading="Remove Quiz"
        text="Are you sure you want to remove this Quiz?"
        buttonText1="No"
        buttonText2="Yes"
        handleClick={() => handleBackQuiz(setId)}
      />
    </div>
  );
}

export default QuizCreation;
