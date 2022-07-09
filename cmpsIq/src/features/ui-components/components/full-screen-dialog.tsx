// Full Screen Dialog
// Author Name:Pratik Tiwari
// Date:05/05/2022

// Start of the component

import React from "react";
import PropTypes from "prop-types";

import CloseIcon from "@mui/icons-material/Close";
import { Container, Icon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton } from "@mui/material";
//  import { useEffect, useState } from "react";

//  const GRID_PROPS = { xs: 2, sm: 4, md: 4 };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// type LLFullScreenDialogProps = { actions: any; children: any };

export function LLFullScreenDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <IconButton size="small" onClick={handleClickOpen}> */}
        <Icon fontSize="medium" onClick={handleClickOpen}>{props?.actions}</Icon>
      {/* </IconButton> */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        title={props.title}
        TransitionComponent={Transition}
      >
        <Container maxWidth="xl" disableGutters>
          <AppBar color="inherit" sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          {props.children}
        </Container>
      </Dialog>
    </>
  );
}

LLFullScreenDialog.propTypes = {
  actions: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  title:PropTypes.any.isRequired,
};

//End of the component
