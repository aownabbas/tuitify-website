import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const WebPagination = ({ handleChange, count, page, size, shape, color }) => {
  // console.log(count, 'counting giists');
  return (
    <Stack>
      <Pagination
        count={count}
        onChange={handleChange}
        variant="outlined"
        shape={shape}
        size={size}
        page={page}
        color={color}
      />
    </Stack>
  );
};
export default WebPagination;
