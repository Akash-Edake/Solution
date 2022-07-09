// Radio Buttons
// Author Name:Radhika Nibandhe
// Date:06/05/2022

// Start of the component
import React from "react";
import PropTypes from "prop-types";

import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from "@mui/material";

// type LLRadioButtonsProps = {
//   label: string;
//   name: string;
//   radioValues: Array<string>;
// };

export function LLRadioButtons(props: any) {
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={props.radioValues.at(0)}
        name="radio-buttons-group"
      >
        {props.radioValues.map((value: string, index: number) => (
          <FormControlLabel
            key={index}
            value={value}
            control={<Radio {...props}/>}
            label={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

LLRadioButtons.propTypes = {
  label: PropTypes.string.isRequired,
  radioValues: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

//End of the component
