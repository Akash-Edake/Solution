33; // TextField Alphanumeric
// Author Name:Radhika Nibandhe
// Date:05/05/2022

// start of the component
import React, { useState } from "react";
import PropTypes from "prop-types";

import { TextField } from "@mui/material";

// type LLTextFieldProps = {
//   id: string;
//   name: string;
//   label: string;
//   maxLength: number;
//   required: boolean;
//   precision: number;
// };

export function LLTextFieldNumeric(props: any) {

  return (
    <TextField
      id={props.id}
      name={props.name}
      label={props.label}
      onChange={(e) => {
        e.target.value = e.target.value
          .replace(/[^0-9.]/g, "")
          .replace(/(\..*)\./g, "$1");
      }}
      onKeyPress={(event) => {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (event?.key === '-' || event?.key === '+'|| event?.key === '/' || charCode > 31 && (charCode < 45 ||charCode > 57) ) {
          event.preventDefault();
        }
      }}
      required={props.required}
      inputProps={{ maxLength: props.maxLength }}
      {...props}
      value={props.defaultValue}
    />
  );
}

LLTextFieldNumeric.propType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  precision: PropTypes.number,
};

LLTextFieldNumeric.defaultProps = {
  variant: "outlined",
  maxLength: 10,
  required: false,
};
// End of the component
