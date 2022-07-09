import React from 'react';
import PropTypes from 'prop-types';

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
} from '@mui/material';
import {Autocomplete} from '@mui/lab';

const makeYearList = (limit) => {
  const currentYear = new Date().getFullYear();
  const min = currentYear - 10;
  const max = currentYear + 10;
  let yearList = [];
  for (let i = min; i <= max; i++) {
    yearList.push(i);
  }
  return yearList;
};

export function YearSelector(props: any) {
  return (
    <FormControl fullWidth error={props.error} sx={{minWidth: props.minWidth}}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        onBlur={props.onBlur}
        id={props.id}
        autoWidth
        defaultValue={''}
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        name={props.name}
        data-testid={props.datatestid}
        {...props}
      >
        {makeYearList(props.limit)?.map((x: number, i: React.Key | null | undefined) => (
          <MenuItem key={i} value={x}>
            {x}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}
YearSelector.propType = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
};

//End of the component
