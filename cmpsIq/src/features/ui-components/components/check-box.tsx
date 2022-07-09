// Check box
// Author Name:Radhika Nibandhe
// Date:05/05/2022
// Start of the component

import React from "react";
import PropTypes from "prop-types";

import { FormControlLabel, Checkbox } from "@mui/material";

// type LLCheckBoxProps = { value: string; label: string };

export function LLCheckBox(props: any) {
  return (
    <FormControlLabel
      control={<Checkbox checked={props.checked} value={props.value} onChange={props.onChange} {...props}/>}
      label={props.label}
      {...props}
    />
  );
}

LLCheckBox.propType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

// End of the component
