/**
 * vertical [top,center,bottom]
 * horizontal [left,center,right]2
 *
 */

import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomToast = ({ vertical, horizontal, openToast, handleCommentToastClose, commentObject }) => {
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK;
  const loginData = JSON.parse(localStorage.getItem('@LoginData'));
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={loginData?.id == commentObject?.user_id ? false : openToast}
        autoHideDuration={5000}
        onClose={handleCommentToastClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCommentToastClose}
          icon={false}
          severity="info"
          sx={{ display: 'flex', alignItems: 'center', width: '20rem', background: 'rgb(77 85 116)', height: 'auto' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                marginRight: 2,
                height: '30px',
                width: '30px',
                borderRadius: '30px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                src={
                  commentObject?.image == null
                    ? '/assets/icons/new/user.svg'
                    : `${awsLink}users/profileImages/${commentObject?.image}`
                }
                layout="fill"
                className="position-absolute"
                alt={`${commentObject?.first_name} + ' ' + image`}
              />
            </Box>
            <Box>
              <Typography sx={{ color: '#FFFFFF', fontFamily: 'Gilroy-Bold', fontStyle: 'normal', forntSize: '16px' }}>
                {commentObject?.first_name + ' ' + commentObject?.last_name}
              </Typography>
              <Box sx={{ color: '#FFFFFF' }}>
                {commentObject?.comment?.length > 20
                  ? commentObject?.comment.slice(0, 20) + '...'
                  : commentObject?.comment}
              </Box>
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomToast;
