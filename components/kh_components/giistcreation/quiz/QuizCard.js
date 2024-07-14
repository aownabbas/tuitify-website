import React from 'react';
import classes from './QuizCreation.module.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import OptionCard from './OptionCard';
import DummyDeleteModal from '../../../modals/deletemodal/DummyDeleteModal';
import SkeletonLoader from '../../kh_home/SkeletonLoader';
import { Skeleton, Tooltip } from '@mui/material';
import GenericTooltip from '../../../ch/GenericTooltip';
import { Dropdown, DropdownButton } from 'react-bootstrap';
const QuizCard = ({
  handleDeleteOption,
  questions,
  question,
  setQuestions,
  handleFocus,
  parentIndex,
  handleChangeValues,
  handleAddExplanationShow,
  handleHideExplanationShow,
  handleChangeSelect,
  handleDeleteQusetions,
  deleteQuizModal,
  handleCloseModal,
  handleOpenModal,
  hanldeChangeTrueFalse,
  handleGetID,
  setOptionId,
  handleCreateOptions,
  handleCreateDescription,
  quizTypeDefine,
  handleAnswerType,
  buttonDisabled,
  optionDisabled,
  selecedChapter,
  setSelecedChapter,
  loading,
}) => {
  const AddNewOption = (parentIndex) => {
    let myQuestions = [...questions];
    let getSingleQuestions = myQuestions[parentIndex];
    getSingleQuestions?.options.push({ id: 1, answer: '', correct_answer: 0 });
    getSingleQuestions = myQuestions[parentIndex];
    setQuestions(myQuestions);
  };

  const handleChangeOptions = (e, parentIndex, childIndex) => {
    const questionsArray = [...questions];
    let op = questionsArray[parentIndex];
    const { name, value } = e.target;
    op.options[childIndex][name] = value;
    setQuestions(questionsArray);
  };

  return (
    <div className={`border mt-2 col-12 ${classes.innerContainer}`} onClick={() => setSelecedChapter(parentIndex)}>
      <div className="px-2">
        <div className="d-flex">
          <div className="col-6">
            <div className="mt-2 semibold">Question {parentIndex + 1} </div>
          </div>
          <div className="col-6">
            <div className="float-end">
              <Nav>
                {quizTypeDefine?.name == 'Open Question' ? (
                  <>
                    <NavDropdown
                      title={question?.question_type}
                      className={`semibold ${classes.drowdown} rounded`}
                      id="nav-dropdown-dark-example-3"
                      style={{ color: '#303548 !important' }}
                    ></NavDropdown>
                  </>
                ) : (
                  <NavDropdown
                    className={` semibold ${classes.drowdown} rounded`}
                    id="nav-dropdown-dark-example"
                    title={
                      <div className="d-flex align-items-center">
                        <span className="me-2">{question?.question_type}</span>
                        <Image src="/assets/icons/polygonIcon.svg" width={10} height={10} />
                      </div>
                    }
                  >
                    <NavDropdown.Item
                      onClick={() => handleAnswerType(parentIndex, 'Multiple Answers', 1, question)}
                      className={classes.DropdownHove}
                      style={{
                        color: '#303548 !important',
                        backgroundColor: '#FFF',
                        border: '1px solid #FFF',
                        borderRadius: '5px',
                      }}
                    >
                      Multiple Answers
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleAnswerType(parentIndex, 'One Answer', 2, question)}
                      className={classes.DropdownHove}
                      style={{
                        color: '#303548 !important',
                        backgroundColor: '#FFF',
                        border: '1px solid #FFF',
                        borderRadius: '5px',
                      }}
                    >
                      One answer
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={classes.DropdownHove}
                      onClick={() => handleAnswerType(parentIndex, 'True / False', 3, question)}
                      style={{
                        color: '#303548 !important',
                        backgroundColor: '#FFF',
                        border: '1px solid #FFF',
                        borderRadius: '5px',
                      }}
                    >
                      True / False
                    </NavDropdown.Item>
                    {quizTypeDefine?.name == 'Survey' && (
                      <NavDropdown.Item
                        className={classes.DropdownHove}
                        onClick={() => handleAnswerType(parentIndex, 'Paragraph', 5, question)}
                        style={{
                          color: '#303548 !important',
                          backgroundColor: '#FFF',
                          border: '1px solid #FFF',
                          borderRadius: '5px',
                        }}
                      >
                        Paragraph
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                )}
              </Nav>
            </div>
          </div>
        </div>
        <div className="regular-small">Create questions and choose the right answer for each of them</div>
        <div className="regular-small mt-2">Question</div>
        {selecedChapter == parentIndex && loading ? (
          <Skeleton
            className="mt-2 semibold"
            variant="rectangular"
            width={'100%'}
            height={45}
            style={{ borderRadius: '5px' }}
          />
        ) : (
          <div className={`border w-100 bg-white mt-2 mb-3 ${classes.inputBorder}`}>
            <div className="d-flex py-1">
              <div className="w-100">
                <input
                  className="w-75 border-0 ms-3"
                  onChange={(e) => handleChangeValues(e, parentIndex)}
                  placeholder="Type your question here"
                  name="question"
                  defaultValue={question?.question}
                  onFocus={() => handleGetID(question?.question_id, parentIndex)}
                  onKeyPress={(event) => event.key === 'Enter' && handleFocus(parentIndex)}
                />
              </div>
              <Tooltip title="Click and Update" placement="top">
                <button onClick={() => handleFocus(parentIndex)} className="border-0 bg-transparent  me-1">
                  <Image src="/assets/icons/CheckIcon.svg" width="22px" height="22px" />
                </button>
              </Tooltip>
            </div>
          </div>
        )}

        {(question.addExplanationShow || question.description) && (
          <div>
            <div className="regular-small mt-3 ms-1">{'Explanation'}</div>
            {selecedChapter == parentIndex && loading ? (
              <Skeleton
                className="mt-2 semibold"
                variant="rectangular"
                width={'100%'}
                height={90}
                style={{ borderRadius: '5px' }}
              />
            ) : (
              <div className={`border mt-2  w-100  ${classes.inputBorder}`}>
                <div className="w-100 d-flex align-items-start">
                  <textarea
                    style={{ resize: 'none' }}
                    type="text"
                    name="description"
                    rows={3}
                    defaultValue={question.description}
                    className={`w-100 border-0 px-3 ${classes.textarea}`}
                    placeholder="add an explanation here"
                    onChange={(e) => handleChangeValues(e, parentIndex)}
                    // onBlur={() => handleCreateDescription(parentIndex, question)}
                    onFocus={() => handleGetID(question?.question_id, parentIndex)}
                    onKeyPress={(event) => event.key === 'Enter' && handleCreateDescription(parentIndex, question)}
                  />
                  <Tooltip title="Click and Update" placement="top">
                    <button className="me-2 border-0 bg-transparent">
                      <Image
                        src="/assets/icons/CheckIcon.svg"
                        width="22px"
                        height="22px"
                        alt="cross"
                        onClick={() => handleCreateDescription(parentIndex, question)}
                      />
                    </button>
                  </Tooltip>
                  <button className="me-1 border-0 bg-transparent">
                    <Image
                      src="/assets/icons/new/red_circle_cross.svg"
                      width="22px"
                      height="22px"
                      alt="cross"
                      onClick={() => handleHideExplanationShow(parentIndex, question)}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ opacity: !question.question && 0.4, cursor: !question.question && 'not-allowed' }}>
          {quizTypeDefine?.name !== 'Open Question' && question.question_type !== 'Paragraph' && (
            <OptionCard
              question={question}
              parentIndex={parentIndex}
              hanldeChangeTrueFalse={hanldeChangeTrueFalse}
              handleChangeOptions={handleChangeOptions}
              handleOpenModal={handleOpenModal}
              handleAddExplanationShow={handleAddExplanationShow}
              handleChangeSelect={handleChangeSelect}
              AddNewOption={AddNewOption}
              handleDeleteOption={handleDeleteOption}
              setOptionId={setOptionId}
              handleCreateOptions={handleCreateOptions}
              buttonDisabled={buttonDisabled}
              optionDisabled={optionDisabled}
              loading={loading}
              selecedChapter={selecedChapter}
              handleGetID={handleGetID}
              quizTypeDefine={quizTypeDefine}
            />
          )}
          <div
            className={`d-flex mt-3 mb-2 align-items-center
             ${question?.question_type == 'Paragraph' && quizTypeDefine?.name == 'Open Question'
                ? 'justify-content-end'
                : 'justify-content-between'
              }`}
          >
            {quizTypeDefine?.name !== 'Open Question' && (
              <div className="d-flex">
                {question?.question_type !== 'True / False' &&
                  question?.question_type !== 'Paragraph' &&
                  (selecedChapter == parentIndex && loading ? (
                    <Skeleton variant="rectangular" width={160} height={25} style={{ borderRadius: '5px' }} />
                  ) : (
                    <button
                      disabled={!question.options[question.options.length - 1].option_id}
                      className="border-0 d-flex bg-transparent"
                      onClick={() => AddNewOption(parentIndex)}
                      style={{ opacity: !question.options[question.options.length - 1].option_id && 0.3 }}
                    >
                      <Image src="/assets/icons/addOpinion.png" height={22} width={22} alt="Add opinion" />
                      <div className="ms-2 semibold">Add an option</div>
                    </button>
                  ))}

                {selecedChapter == parentIndex && loading ? (
                  <Skeleton
                    variant="rectangular"
                    className="ms-3"
                    width={180}
                    height={25}
                    style={{ borderRadius: '5px' }}
                  />
                ) : (
                  <button
                    className={`${question.question_type === 'True / False' || question.question_type === 'Paragraph' ? '' : 'ms-3'
                      }  d-flex border-0 bg-transparent`}
                    onClick={() => handleAddExplanationShow(parentIndex)}
                    disabled={!question.question}
                    style={{ opacity: !question.question && 0.3 }}
                  >
                    <Image src="/assets/icons/addOpinion.png" height={22} width={22} alt="Add explaination" />
                    <div className="ms-2 semibold">Add an explanation</div>
                  </button>
                )}
              </div>
            )}
            {parentIndex != 0 && (
              <button
                className="border-0 bg-transparent"
                disabled={!question.question}
                onClick={() => handleDeleteQusetions(question)}
                style={{ opacity: !question.question && 0.3 }}
              >
                <Image src="/assets/icons/deleteQuestion.svg" height={35} width={35} alt="Delete Question" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
