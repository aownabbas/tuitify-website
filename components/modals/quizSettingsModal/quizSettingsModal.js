import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { pink } from '@mui/material/colors';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '472px',
    height: '420px',
    borderRadius: '15px',
  },
  centeringContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #303548',
    p: 2,
  },
  quizText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '25px',
    fontFamily: 'Gilroy-Regular',
  },
  firsStyle: {
    width: '196px',
    height: '48px',
    background: '#FFFFFF',
    border: '1px solid rgba(53, 52, 82, 0.2)',
    borderRadius: '10px',
    margin: 'auto',
  },
  text: {
    fontFamily: 'Gilroy-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#303548',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px',
  },
  noButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: '1px solid #353452',
    '&:hover': {
      backgroundColor: 'inherit',
      textShadow: 'none',
      border: '1px solid #353452',
    },
    marginRight: '20px',
  },
  yesButton: {
    width: '132px',
    height: '48px',
    borderRadius: '8px',
    color: '#FFFFFF !important',
    textShadow: 'none !important',
    textTransform: 'capitalize',
    backgroundColor: '#353452',
    '&:hover': {
      backgroundColor: '#353452',
      textShadow: 'none',
    },
  },
};

const QuizSettingsModal = ({
  handleCloseModal,
  openModal,
  handleChangeQuestion,
  handleChangeAnswer,
  questionDisplay,
  displayAnswer,
  handleCreateSettingQuiz,
}) => {
  const { modalStyle, centeringContent, quizText, firsStyle, text, buttonGroup, noButton, yesButton } = style;
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Typography sx={quizText}>Quiz Settings</Typography>
          <Image src="/assets/icons/close-circle.svg" width={24} height={24} onClick={() => handleCloseModal()} />
        </Box>
        <Box sx={{ paddingY: '10px', paddingX: '20px' }}>
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: '600',
            }}
          >
            Questions Appearance
          </Typography>
          <Typography sx={{ padding: '4px', fontFamily: 'Gilroy-Regular' }}>
            Choose the best option for question appearance
          </Typography>
        </Box>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={questionDisplay == 0 ? `Fixed` : `Random`}
          name="radio-buttons-group"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={firsStyle}>
              <FormControlLabel
                sx={{ paddingX: '20px' }}
                onClick={() => handleChangeQuestion(0)}
                value="Fixed"
                control={
                  <Radio
                    sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="Fixed"
              />
            </Box>
            <Box sx={firsStyle}>
              <FormControlLabel
                sx={{ paddingX: '20px' }}
                onClick={() => handleChangeQuestion(1)}
                value="Random"
                control={
                  <Radio
                    sx={{
                      color: `${pink[800]} !important`,
                      '&.Mui-checked': {
                        color: `${pink[800]} !important`,
                      },
                    }}
                  />
                }
                label="Random"
              />
            </Box>
          </Box>
        </RadioGroup>
        <Box sx={{ paddingY: '10px', paddingX: '20px' }}>
          <Typography
            sx={{
              fontSize: '16px',
              color: '#303548',
              lineHeight: '20px',
              fontWeight: '600',
            }}
          >
            Show Answers
          </Typography>
          <Typography sx={{ padding: '4px' }}>do you want to show answer?</Typography>
        </Box>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label-2"
          defaultValue={displayAnswer == 0 ? `Hide` : `Show`}
          name="radio-buttons-group-2"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={firsStyle}>
              <FormControlLabel
                sx={{ paddingX: '20px' }}
                value="Show"
                onClick={() => handleChangeAnswer(1)}
                control={
                  <Radio
                    sx={{
                      color: pink[800],
                      '&.Mui-checked': {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="Show"
              />
            </Box>
            <Box sx={firsStyle}>
              <FormControlLabel
                sx={{ paddingX: '20px' }}
                value="Hide"
                onClick={() => handleChangeAnswer(0)}
                control={
                  <Radio
                    sx={{
                      color: `${pink[800]} !important`,
                      '&.Mui-checked': {
                        color: `${pink[800]} !important`,
                      },
                    }}
                  />
                }
                label="Hide"
              />
            </Box>
          </Box>
        </RadioGroup>
        <Box sx={buttonGroup}>
          <Button variant="outlined" onClick={() => handleCloseModal()} sx={noButton}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleCreateSettingQuiz()} sx={yesButton}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default QuizSettingsModal;
