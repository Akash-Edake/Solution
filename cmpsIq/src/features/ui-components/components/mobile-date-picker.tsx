// Name : MobileDatePicker Component
// Author : Tejas Sawant.
// Date: 05/05/2022
//START OF MobileDatePicker Component

import React from "react";
import PropTypes from "prop-types";

import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";

export function LLMobileDatePicker(props: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label={props.label}
        inputFormat="MM/dd/yyyy"
        value={props.value}
        onChange={props.onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

//END OF MobileDatePicker Component
