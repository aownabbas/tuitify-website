import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 364,
  height: 'auto',
  outline: 'none',
  border: '0px',
  borderRadius: '20px',
  overflow: 'hidden',
  p: 3,
};

const CmeModal = (props) => {
  const router = useRouter();

  // this function is used for cme claim later
  const handleClick = async (props) => {
    props?.handleModalClose();
    props.setPlaying(true);
  };

  const handleNewModal = async () => {
    console.log(props.cmeLink, 'modal props');
    // console.log(props?.handleCME(), 'props?.handleCME()');
    if (props.cmeLink) {
      console.log('dekho to');
      // window.open(props?.cmeLink, '_blank');
      const cmeLink = props?.cmeLink;

      const url = new URL(
        cmeLink.startsWith('http://') || cmeLink.startsWith('https://') ? cmeLink : `http://${cmeLink}`,
      );
      window.open(url.href, '_blank');

      await props?.handleModalClose();
      props.handleOpen();
      props.setPlaying(false);
      return;
    } else {
      await props?.handleCME();
      await props?.handleModalClose();
      return;
    }
  };
  return (
    <Modal
      style={{ zIndex: '999999' }}
      open={props.modalOpen}
      onClose={false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="text-center border-0 bg-white">
        {props.image}
        <Typography
          id="modal-modal-title"
          sx={{
            mt: 2,
            fontFamily: 'Gilroy-Regular',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '25px',
            textAlign: 'center',
            color: '#303548',
          }}
          component="h2"
        >
          {props.title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 3,
            mb: 3,
            fontFamily: 'Gilroy-Regular',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '18px',
            textAlign: 'center',
            color: 'rgba(53, 52, 82, 0.78)',
          }}
        >
          {props.description}
        </Typography>
        <div className="row mt-5">
          <div className="mx-auto col-6 d-block">
            <button
              className=" px-0 w-100 py-2 "
              onClick={() => handleClick(props)}
              style={{
                width: '132px',
                height: '48px',
                border: '1px solid #353452',
                borderRadius: '10px',
              }}
            >
              {props.button1}
            </button>
          </div>

          <div className="mx-auto col-6">
            <button
              className="main-background-color text-white px-0 w-100 py-2 "
              onClick={async () => await handleNewModal()}
              style={{
                width: '132px',
                height: '48px',
                border: '1px solid #353452',
                color: '#FFFFFF',
                borderRadius: '10px',
              }}
            >
              {props.button2}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CmeModal;
