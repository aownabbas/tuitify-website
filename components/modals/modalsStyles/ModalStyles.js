const ModalStyles = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
  },
  conferenceModalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 540,
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
  },
  centeringContent: {
    textAlign: 'center',
  },
  modalHeading: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
  },
  ConferenceModalHeading: {
    fontFamily: 'Gilroy-Medium',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '30px',
    color: '#303548',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0',
    paddingTop: '15px',
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
  centeredCloseBtn: {
    width: '100%',
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
export default ModalStyles;