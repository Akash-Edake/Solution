// TextField Numeric
// Author Name:Radhika Nibandhe
// Date:05/05/2022

//start of the component

import React from "react";
import PropTypes from "prop-types";

import { TextField } from "@mui/material";

// type LLTextFieldProps = {
//   id: string;
//   name: string;
//   label: string;
//   maxLength: number;
//   required: boolean;
// };

export function LLTextFieldAlphaNumeric(props: any) {
  return (
    <TextField
      id={props.id}
      label={props.label}
      name={props.name}
      required={props.required}
      defaultValue={props.defaultValue}
      value={props.defaultValue}
      onKeyPress={(event) => {
        if (event?.key === '-' || event?.key === '+') {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

// LLTextFieldAlphaNumeric.propType = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   maxLength: PropTypes.number,
//   required: PropTypes.bool,
// };

// LLTextFieldAlphaNumeric.defaultProps = {
//   variant: "outlined",
//   maxLength: 10,
//   required: "false",
// };

// End of the component
