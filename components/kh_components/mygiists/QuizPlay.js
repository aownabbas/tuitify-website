import classes from './PlayGiistsVideo.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import QuizPlayModal from '../../modals/quizplaymodal/QuizPlayModal';
import { Kh_QuizPlay_Giist } from '../../../redux/actions/types';
import Kh_QuizPlayGiist, { Kh_GetResult, Kh_SubmitAnwer, Time_UpCallFinal } from '../../../redux/actions/Kh_QuizPlay';
import Options from './Options';
import { URL } from '../../../public/assets/path/path';
import { useDispatch } from 'react-redux';
import AlertModal from '../../modals/alertmodal/AlertModal';
import Counter from './Counter';
import SuccessModal from '../../modals/simplemodal/SuccessModal';
import kh_FinalQuizAttempted from '../../../redux/actions/kh_FinalQuizAttempted';

const QuizPlay = ({
  chapterId,
  VidId,
  handlePlayGiists,
  ReviewGiist,
  playGiists,
  setPlayGiists,
  stateButton,
  chapIndex,
  subChapIndex,
  quizType,
  updateProperty,
  setStateButton,
  quizId,
  setDotloading,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sliderValue, setSliderValue] = useState('');
  let [score, setScore] = useState('0/0');

  let [currentTime, setCurrentTime] = useState(0);

  let [timeStop, setTimeStop] = useState(false);

  const [resultModal, setResultModal] = useState('');
  const [resultModalOpen, setResultModalOpen] = useState(false);
  let min = questions[currentQuestion]?.timer * 60;
  let seconds = questions[currentQuestion]?.seconds;

  function formatTime(totalSeconds) {
    let hh = Math.floor(totalSeconds / 3600);
    let mm = Math.floor((totalSeconds % 3600) / 60);
    let ss = totalSeconds % 60;

    // Format the time as "hh:mm:ss"
    let formattedTime = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss
      .toString()
      .padStart(2, '0')}`;

    return formattedTime;
  }

  const handleFinalQuizAttemped = () => {
    setDotloading(true);
    setTimeStop(false);
    let params = { quiz_id: quizId, last_remaining_time: String(formatTime(min + seconds)) };
    dispatch(kh_FinalQuizAttempted(params, onFinalAttemptedSuccess, onFinalAttemptedError));
  };

  // Example usage

  const onFinalAttemptedSuccess = (res) => {
    if (res.status == true) {
      setStateButton(false);
      updateProperty(playGiists, chapIndex, subChapIndex, 'attempted', 1);
      updateProperty(playGiists, chapIndex, subChapIndex, 'firstTime', 1);
      setDotloading(false);
    }
  };

  const onFinalAttemptedError = (error) => {
    console.log(error);
    setDotloading(false);
  };

  const handleModalOpen = (heading, text, buttonText, image) => {
    setResultModal(heading, text, buttonText, image);
    setResultModalOpen(true);
  };
  const handleModalColse = () => {
    setResultModalOpen(false);
  };

  let [scoreInPercentage, setscoreInPercentage] = useState(0);

  const dispatch = useDispatch();
  // error modal

  const [errorModal, setErrorModal] = useState(false);
  const handleOpenModal = () => setErrorModal(true);
  const handleColseModal = () => setErrorModal(false);

  const [surveyModal, setSurveyModal] = useState(false);

  const surveyModalColse = () => setSurveyModal(false);
  const surveyModalOpen = () => setSurveyModal(true);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [response_id, setResponse_id] = useState(0);

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSliderValue(currentQuestion + 1);
    }
  }

  function handlePrev() {
    if (questions.length && currentQuestion > 0) {
      // Check if there are questions and current question is greater than 1
      setCurrentQuestion(currentQuestion - 1);
      setSliderValue(currentQuestion - 1);
    }
  }
  useEffect(() => {
    setDotloading(true);
    setTimeStop(false);
    setCurrentQuestion(0);
    setSliderValue(0);
    let params = `tutorial_id=${VidId}&chapter_id=${chapterId}`;
    dispatch(Kh_QuizPlayGiist(params, onPlayGiistSuccess, onPlayGiistError));

    return () => { };
  }, [chapterId]);

  function getQuizType(quizType) {
    switch (quizType.quiz_type) {
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

  const onPlayGiistSuccess = (res) => {
    setDotloading(false);
    let questionsData = res.quiz;
    questionsData?.map((question) => {
      let newValue = getQuizType(question);
      if (question.question_type == 1) {
        question.question_type = 'Multiple Answers';
        question.quiz_type = newValue;
      } else if (question.question_type == 2) {
        question.question_type = 'One Answer';
        question.quiz_type = newValue;
      } else if (question.question_type == 3) {
        question.question_type = 'True / False';
        question.quiz_type = newValue;
      } else if (question.question_type == 5) {
        question.question_type = 'Paragraph';
        question.quiz_type = newValue;
      }
    });
    setQuestions(questionsData);
  };

  const onPlayGiistError = (error) => {
    setDotloading(false);

    console.log('error', error);
  };

  // handle Quiz Attemped

  const onConfirmPress = () => {
    confirmAnswer(questions[currentQuestion].question_id, selectedOptions);
    setSelectedOptions([]);
  };

  const storeStringAnswer = (str) => {
    let array = [];
    setSelectedOptions([]);
    array.push(str);
    setSelectedOptions(array);
  };

  const handleTimeUp = (quizId) => {
    setDotloading(true);
    let params = { quiz_id: quizId };
    dispatch(Time_UpCallFinal(params, onTimeUPSuccess, onTimeUpError));
  };

  const onTimeUPSuccess = (res) => {
    console.log(res);
    setDotloading(false);
  };

  const onTimeUpError = (error) => {
    console.log(error);
    setDotloading(false);
  };
  const confirmAnswer = async (question_id, answers) => {
    setDotloading(true);

    let totalQuestion = questions.length;
    let mainQuiz_id = questions[currentQuestion].quiz_id;
    let tutorial_id = VidId;
    let index = 2;
    if (currentQuestion == 0) {
      index = 1;
    } else if (currentQuestion == 0 && currentQuestion == questions.length - 1) {
      index = 1;
    } else if (currentQuestion == questions.length - 1) {
      index = 3;
    }

    let { platform_id, name } = await JSON.parse(localStorage.getItem('@GetPlatData'));
    let { id } = await JSON.parse(localStorage.getItem('@LoginData'));

    const params = JSON.stringify({
      name: name,
      issurvey: quizType == 5 || quizType == 4 ? 1 : 0,
      q_id: question_id,
      p_id: platform_id,
      res_id: response_id,
      u_id: id,
      t_id: tutorial_id,
      mainquize_id: mainQuiz_id,
      isindex: index,
      answer: answers,
      tq: totalQuestion,
      chapter_id: chapterId,
      last_remaining_time: String(formatTime(currentTime)),
    });
    dispatch(Kh_SubmitAnwer(params, onSubmitQuizSuccess, onSubmitQuizError));
  };

  const onSubmitQuizSuccess = (res) => {
    if (res.status == 'true') {
      if (res.message == 'answer submitted') {
        setscoreInPercentage(res.score);
        setResponse_id(res.insertid);
        handleNext();
        updateProperty(playGiists, chapIndex, subChapIndex, 'score', res.score);
        setSelectedOptions([]);
        setDotloading(false);
      }
      if (res.message == 'Quiz finished') {
        setResponse_id(res.insertid);
        setscoreInPercentage(res.score);
        updateProperty(playGiists, chapIndex, subChapIndex, 'score', res.score);
        setSelectedOptions([]);
        setDotloading(false);
        if (quizType == 4 || quizType == 5) {
          surveyModalOpen();
        } else {
          handleModalOpen({
            heading: 'Quiz Finished',
            text: `${`You just finished the quiz and your score is ${res.score}%. Thank you for your time`} `,
            buttonText: 'Okay',
            image: '/assets/images/finalTimeUp.svg',
          });
          if (quizType == 2) {
            setTimeStop(true);
          }
        }
      }
    }
  };

  const onSubmitQuizError = (error) => {
    console.log('submit error', error);
    setDotloading(false);
  };
  if (
    subChapIndex == null
      ? quizType == 2 && playGiists?.chapters[chapIndex]?.attempted && !playGiists?.chapters[chapIndex]?.firstTime == 1
      : quizType == 2 &&
      playGiists?.chapters[chapIndex]?.subchapter[subChapIndex]?.attempted &&
      !playGiists?.chapters[chapIndex]?.subchapter[subChapIndex]?.firstTime == 1
  ) {
    return (
      <div className={`col-12 ${classes.quizBox}`} style={{ position: 'relative' }}>
        <div className={` col-12 w-100`}>
          <div className={classes.quizText}>
            <div className={`col-12 ${classes.innerContainer}`} style={{ height: '400px' }}>
              <div className="d-flex align-items-center justify-content-center flex-column">
                <div className="mb-2 p-1">
                  <Image src="/assets/icons/finalIcon.svg" width={124} height={124} />
                </div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '25px',
                    textAlign: 'center',
                    color: '#303548',
                  }}
                  className="mb-3"
                >
                  Sorry
                </p>
                <p style={{ width: '400px', textAlign: 'center' }}>
                  You have already passed the quiz and your score is{' '}
                  {subChapIndex == null
                    ? playGiists.chapters[chapIndex]?.score == null
                      ? 0
                      : playGiists.chapters[chapIndex]?.score
                    : playGiists.chapters[chapIndex]?.subchapter[subChapIndex]?.score == null
                      ? 0
                      : playGiists.chapters[chapIndex]?.subchapter[subChapIndex]?.score}
                  %. You cannot take the quiz again.
                </p>
                <button
                  onClick={() => {
                    handlePlayGiists();
                  }}
                  className="border-0 mt-5"
                  style={{
                    background: '#353452',
                    borderRadius: '10px',
                    width: '170px',
                    height: '48px',
                    color: '#fff',
                  }}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return stateButton && quizType == 2 ? (
    <div className={`col-12 ${classes.quizBox}`} style={{ position: 'relative' }}>
      <div className={` col-12 w-100`}>
        <div className={classes.quizText}>
          <div className={`col-12 ${classes.innerContainer}`} style={{ height: '400px' }}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <div className="mb-2 p-1">
                <div
                  style={{
                    width: '102px',
                    height: '102px',
                    background: '#DDD',
                    margin: 'auto',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '71.68px',
                      height: '71.68px',
                      background: `linear-gradient(241.72deg, #88EDFE -43.84%, #625EFE 59.56%, #C224FE 167.61%)`,
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 'auto',
                    }}
                  >
                    <span
                      style={{
                        fontStyle: 'normal',
                        fontWeight: '800',
                        fontSize: '24px',
                        lineHeight: '30px',
                        textAlign: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      ?
                    </span>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '25px',
                  textAlign: 'center',
                  color: '#303548',
                }}
                className="mb-3"
              >
                Final Quiz Start
              </p>
              <p style={{ width: '400px', textAlign: 'center' }}>
                We are going to test your knowledge You are going to start a Quiz Exam
              </p>
              <p className="m-0 mt-3">
                <span className="text-danger"> Warning: </span>
                You only have one try to complete this Quiz
              </p>
              <button
                onClick={() => handleFinalQuizAttemped()}
                className="border-0 mt-5"
                style={{
                  background: '#353452',
                  borderRadius: '10px',
                  width: '170px',
                  height: '48px',
                  color: '#fff',
                }}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={` col-12 w-100`} style={{ height: '100%', overflowY: 'scroll', padding: '10px' }}>
      <div className={`${classes.quizText} ${classes.innerContainer}`} style={{ height: '85%', overflowY: 'scroll' }}>
        <div className={`col-12 `} style={{ overflowY: 'scroll' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Image src="/assets/icons/simpleQuiz.png" height="10px" width="10px" alt="simple quiz" />
              <span className={`ms-1 ${classes.simp}`}>
                {questions[currentQuestion]?.quiz_type}
                <span
                  style={{
                    color: '#30354866',
                    marginLeft: '5px',
                    cursor: 'pointer',
                  }}
                  id="demo-positioned-button"
                  aria-haspopup="true"
                >
                  ( {questions[currentQuestion]?.question_type} )
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center">
              {quizType === 2 ? (
                <Counter
                  min={questions[currentQuestion]?.timer * 60}
                  seconds={questions[currentQuestion]?.seconds}
                  handleModalOpen={handleModalOpen}
                  score={scoreInPercentage}
                  setCurrentTime={setCurrentTime}
                  handleTimeUp={handleTimeUp}
                  quizId={quizId}
                  timeStop={timeStop}
                  ReviewGiist={ReviewGiist}
                />
              ) : (
                ''
              )}
              <span className={`me-1 ${classes.gradient}`}>
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          </div>
          <div className="col-12 mt-2">
            <span className={classes.ques}>
              {`Q ${currentQuestion + 1}`} : {questions[currentQuestion]?.question}
            </span>
          </div>
          {questions[currentQuestion]?.question_type == 'Paragraph' ? (
            <div className="col-12 mt-3 w-100" style={{ marginBottom: '10px' }}>
              {ReviewGiist == true ? (
                <textarea
                  type="text"
                  className="w-100"
                  placeholder="Write here"
                  rows={4}
                  style={{
                    background: ' #FFFFFF',
                    border: '1px solid rgba(53, 52, 82, 0.2)',
                    outline: 'none',
                    borderRadius: '10px',
                    resize: 'none',
                    padding: '10px',
                  }}
                  value={selectedOptions}
                  onChange={(e) => storeStringAnswer(e.target.value)}
                  disabled={true}
                />
              ) : (
                <textarea
                  type="text"
                  className="w-100"
                  placeholder="Write here"
                  rows={4}
                  style={{
                    background: ' #FFFFFF',
                    border: '1px solid rgba(53, 52, 82, 0.2)',
                    outline: 'none',
                    borderRadius: '10px',
                    resize: 'none',
                    padding: '10px',
                  }}
                  value={selectedOptions}
                  onChange={(e) => storeStringAnswer(e.target.value)}
                />
              )}
            </div>
          ) : (
            <Options
              currentQuestion={currentQuestion}
              questions={questions}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
              ReviewGiist={ReviewGiist}
            />
          )}
          {questions[currentQuestion]?.description !== '' && (
            <>
              <div className="mt-3">
                <h2 className={classes.explain}>Explanation </h2>
              </div>
              <div className="mt-3">
                <p className={classes.explaination}>{questions[currentQuestion]?.description}</p>
              </div>
            </>
          )}
        </div>
        {/* <div
          // className={` `}
          style={{ position: 'absolute', bottom: '10px',height:"12%"}}
        > */}
        <div className="px-2 d-none d-sm-block">
          <div className={`${classes.progressBar} row`} style={{ position: 'absolute', bottom: '10px', height: '12%' }}>
            <div className=" d-flex mt-2">
              {ReviewGiist && (
                <div className=" col-1 mt-1">
                  <div className="text-center">
                    <Image
                      src="/assets/images/arrow-square-right.svg"
                      width="24px"
                      height="24px"
                      onClick={() => {
                        handlePrev();
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="col-8 px-0">
                <Box className=" px-2 text-white">
                  <Slider min={0} max={questions.length - 1} value={sliderValue} aria-labelledby="slider" />
                </Box>
              </div>
              <div className={`col-2 ${classes.next} text-center mt-2`}> Next Question</div>
              <div className="col-1 text-center mt-1">
                <Image
                  src="/assets/images/arrow-square-left.svg"
                  width="24px"
                  height="24px"
                  onClick={() => {
                    ReviewGiist ? handleNext() : selectedOptions.length === 0 ? handleOpenModal() : onConfirmPress();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <QuizPlayModal
          openModal={errorModal}
          handleColseModal={handleColseModal}
          heading="Alert"
          text="Please select an option"
          alertText={true}
          buttonText={'Okay'}
          setDotloading={setDotloading}
        />
        <QuizPlayModal
          openModal={resultModalOpen}
          handleColseModal={handleModalColse}
          heading={resultModal.heading}
          text={resultModal.text}
          buttonText={resultModal.buttonText}
          image={resultModal.image}
          response_id={response_id}
          quizType={questions[currentQuestion]?.quiz_type}
          setCurrentQuestion={setCurrentQuestion}
          setSliderValue={setSliderValue}
          setResponse_id={setResponse_id}
          handlePlayGiists={handlePlayGiists}
          score={scoreInPercentage}
          setScore={setScore}
          updateProperty={updateProperty}
          setStateButton={setStateButton}
          playGiists={playGiists}
          chapIndex={chapIndex}
          subChapIndex={subChapIndex}
          setDotloading={setDotloading}
        />

        <QuizPlayModal
          openModal={surveyModal}
          handleColseModal={surveyModalColse}
          heading="Thank you for your feedback"
          text={'Survey submitted successfully'}
          image={'/assets/images/finalTimeUp.svg'}
          handlePlayGiists={handlePlayGiists}
          setCurrentQuestion={setCurrentQuestion}
          setSliderValue={setSliderValue}
          setResponse_id={setResponse_id}
          response_id={response_id}
          buttonText={'Okay'}
          setDotloading={setDotloading}
        />
      </div>
    </div>
  );
};

export default QuizPlay;
