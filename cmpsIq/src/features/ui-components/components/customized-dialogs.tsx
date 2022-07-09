// Customized Dialog
// Author Name:Pratik Tiwari
// Date:05/05/2022

// Start of the component
import React from "react";
import PropTypes from "prop-types";

import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const ButtonWithAGrid = ({
  id,
  label,
  gridProps,
  variant,
  size,
  sx,
  onClick,
}: any) => {
  return (
    <Grid item {...gridProps}>
      {/* <FormControl fullWidth sx={{mb: 2,p:2}}> */}
      <Button
        sx={{ p: 2 }}
        onClick={onClick}
        variant={variant}
        color="primary"
        size={size}
        id={id}
      >
        {label}
      </Button>
      {/* </FormControl> */}
    </Grid>
  );
};

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

type LLCustomizedDialogProps = { actions: any; children: any; title: string , gridProps:any ,icon:any};

export function LLCustomizedDialogs(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {props.icon ? (
        <IconButton size="small" onClick={handleClickOpen}>
          {props?.icon}
        </IconButton>
      ) : (
        <Button variant="text" onClick={handleClickOpen} size="small">
          {props?.actions}
        </Button>
      )}

      {/* <ButtonWithAGrid
        sx={{}}
        id={'add-property'}
        label={'+Property'}
        gridProps={props?.gridProps}
        size="large"
        onClick={handleClickOpen}
      /> */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xl"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props?.title ?? "View"}
        </BootstrapDialogTitle>
        <DialogContent dividers>{props.children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

LLCustomizedDialogs.propTypes = {
  actions: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

//End of thecomponent
