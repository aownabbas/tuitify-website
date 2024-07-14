import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const GenericTooltip = (props) => {
  return (
    <>
      <Tooltip
        title={props.title}
        // style={{ zIndex: "999999999999999999999999"}}
        // PopperProps={{
        //     modifiers: [
        //         {
        //             name: "offset",
        //             options: {
        //                 offset: [0, 50],
        //             },
        //         },
        //     ],
        // }}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: 'white',
              color: '#303548',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              border: '1px solid #303548',
            },
          },
        }}
        TransitionComponent={Zoom}
        placement={props.placement}
      >
        <span>{props.component}</span>
      </Tooltip>
    </>
  );
};

export default GenericTooltip;
