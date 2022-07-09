// Check box Group
// Author: Radhika Nibandhe
// Date: 06/05/2022
// Start of the component

import React from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// type LLCheckBoxGroupProps = { label: string; checkValues: Array<string> };

export function LLCheckBoxGroup(props: any) {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        {props.checkValues.map((value: string, index: number) => (
          <FormControlLabel
            key={index}
            value={value}
            control={<Checkbox  {...props}/>}
            label={value}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

LLCheckBoxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  checkValues: PropTypes.array.isRequired,
};

// End of the component
