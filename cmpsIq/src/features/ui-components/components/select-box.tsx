// Select Box Multiple select
// Author Name:Radhika Nibandhe
// Date:05/05/2022

// Start of the component

import React from "react";
import PropTypes from "prop-types";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/lab";


// type DropdownItems = {
//   value: number;
//   key: string;
// };

// type LLSelectBoxProps = {
//   name: string;
//   value: string;
//   label: string;
//   id: string;
//   minWidth: number;
//   dropdownItems: Array<DropdownItems>;
// };

export function LLSelectBox(props: any) {
  return (
    <FormControl
      fullWidth
      error={props.error}
      sx={{ minWidth: props.minWidth }}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        onBlur={props.onBlur}
        id={props.id}
        defaultValue={""}
        autoWidth
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        name={props.name}
        data-testid={props.datatestid}
      >
        {props.showAll ? (
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
        ) : null}

        {props.dropdownItems?.map(
          (
            x: {
              value: string | number | readonly string[] | undefined;
              key:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            },
            i: React.Key | null | undefined
          ) => (
            <MenuItem key={i} value={x.value}>
              {x.key}
            </MenuItem>
          )
        )}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}
LLSelectBox.propType = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dropdownItems: PropTypes.array.isRequired,
};

//End of the component
