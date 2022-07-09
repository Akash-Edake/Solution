// Name : ALert Component
// Author : Tejas Sawant.
// Date: 05/05/2022
//START OF Alert Component

import React from "react";
import PropTypes from "prop-types";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// type alertClassType = "success" | "info" | "warning" | "error";

// type alertVariantType = "outlined" | "filled";

// type LLAlertProps = {
//   AlertClass: alertClassType;
//   AlertMessage: string;
//   AlertTitle: string;
//   AlertColor: alertClassType;
//   AlertVariant: alertVariantType;
// };

export function LLAlert(props: any) {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapse in={open}>
      <Alert
        severity={props.AlertClass}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        color={props.AlertColor}
        variant={props.AlertVariant}
        {...props}
      >
        <AlertTitle>{props.AlertTitle}</AlertTitle>
        {props.AlertMessage}
      </Alert>
    </Collapse>
  );
}

LLAlert.propTypes = {
  AlertClass: PropTypes.oneOf(["success", "error", "info", "warning"])
    .isRequired,
  AlertMessage: PropTypes.string.isRequired,
  AlertTitle: PropTypes.string.isRequired,
  AlertColor: PropTypes.oneOf(["success", "error", "info", "warning"]),
  AlertVariant: PropTypes.oneOf(["outlined", "filled"]),
};

//END OF Alert Component
