import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useState } from 'react';
import { URL } from '../../../public/assets/path/path';
import { GlobalApiCall } from '../../../redux/GlobalApiCall';

const style = {
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // padding: '0px',
    paddingTop: '10vh',
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
};

const RenameUploadedMedia = ({
  openModal,
  handleCloseModal,
  accessToken,
  toUpdateTitle,
  setToupdateTitle,
  updateId,
}) => {
  const { modalStyle, centeringContent, modalHeading, buttonGroup, noButton, yesButton } = style;

  // console.log(updateId, 'stated');

  const updateMedia = async (selectedId) => {
    console.log(selectedId, 'the id of modal');
    var axios = require('axios');
    var data = JSON.stringify({
      id: String(selectedId),
      title: toUpdateTitle,
    });
    console.log(data, 'my response data');

    await GlobalApiCall(
      `${URL.khbaseUrl}updateMediaTitle`,
      'put',
      data,
      function (response) {
        console.log(JSON.stringify(response.data), 'api name');
      },
      function (error) {
        console.log(error);
      },
    );
    // var config = {
    //   method: 'put',
    //   url: `${URL.khbaseUrl}updateMediaTitle`,
    //   headers: {
    //     Authorization: 'Bearer ' + accessToken,
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // };
    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data), 'api name');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="del-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={centeringContent}>
          <Typography id="delete-modal-title" sx={modalHeading}>
            Edit Title
          </Typography>
          <Typography id="del-modal-description" sx={{ mt: 2 }}>
            You can change the title for the Audio
          </Typography>
          <div className="row pt-5 pb-3">
            <label htmlFor="editTitle" className="d-flex flex-start mb-2">
              Enter title here
            </label>

            <input
              id="editTitle"
              type="text"
              name="title"
              placeholder="Enter Giist Title"
              style={{ height: '48px', border: '1px solid #353452', borderRadius: '10px' }}
              className={`w-100`}
              onChange={(e) => setToupdateTitle(e.target.value)}
              value={toUpdateTitle}
            />
          </div>
          <Box sx={buttonGroup}>
            <Button variant="outlined" onClick={handleCloseModal} sx={noButton}>
              No
            </Button>
            <Button
              variant="contained"
              sx={yesButton}
              onClick={() => {
                updateMedia(updateId);
                handleCloseModal();
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default RenameUploadedMedia;
