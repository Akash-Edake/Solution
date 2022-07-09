// Switch
// Author Name:Radhika Nibandhe
// Date:05/05/2022
// Start of the component

import React from "react";
import PropTypes from "prop-types";

import { FormControlLabel, Switch } from "@mui/material";

// type labelPlacementTypes = "start" | "bottom" | "top" | "end";

// type LLSwitchProps = {
//   labelPlacement: labelPlacementTypes;
//   value: boolean;
//   label: string;
// };

export function LLSwitch(props: any) {
  return (
    <FormControlLabel
      control={<Switch checked={props.checked} value={props.value} onChange={props.onChange} {...props}/>}
      label={props.label}
      {...props}
    />
  );
}

LLSwitch.propType = {
  value: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

LLSwitch.defaultProps = { labelplacement: "end" };

// End of the component
