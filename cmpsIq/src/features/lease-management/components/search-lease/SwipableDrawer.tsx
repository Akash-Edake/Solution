import {Global} from '@emotion/react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';
//import Root from 'Root';

const drawerBleeding = 56;

export default function SwipeableEdgeDrawer(props: any) {
  const {window} = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            //maxHeight: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'scroll',
          },
        }}
      />
      <Box sx={{textAlign: 'end', pt: 1}}>
        <FilterAltIcon onClick={toggleDrawer(true)} />
      </Box>
      {/* <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {props.children}
      </SwipeableDrawer> */}
    </>
  );
}
