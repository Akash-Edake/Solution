// Name : AutoComplete Component
// Author : Tejas Sawant.
// Date: 05/05/2022
//START OF AutoComplete Component

import React from "react";
import PropTypes from "prop-types";

import Autocomplete from "@mui/material/Autocomplete";

// type LLAutoCompleteProps = { label: string; data: any; id: string };

export function LLAutoComplete(props: any) {
  return (
    <Autocomplete
      id={props.id}
      options={props.options}
      value={props.value}
      renderOption={props.renderOption}
      {...props}
    /> 
  );
}
// LLAutoComplete.propTypes = {
//   label: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
// };

//END Of AutoComplete
