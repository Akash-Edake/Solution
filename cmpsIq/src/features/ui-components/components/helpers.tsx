import { Button, FormControl, Grid, FormHelperText} from "@mui/material";
// import DateAndTimePicker from 'components/shared/ui-elements/DateAndTimePicker';
// import { DropdownCustom, SwitchCustom } from 'components/shared/ui-elements/UIElements';
import {
    LLMobileDatePicker,
  LLSwitch,
  LLSelectBox,
  LLTextFieldAlphaNumeric,
  LLTextFieldNumeric,
} from "@features/ui-components";
import React from "react";

export const FULL_WIDTH_GRID_PROPS = { xs: 4, sm: 8, md: 12, xl: 16 };
export const HALF_WIDTH_GRID_PROPS = { xs: 2, sm: 4, md: 6, xl: 8 };
export const FORTH_WIDTH_GRID_PROPS = { xs: 1, sm: 2, md: 3, xl: 4 };
export const THIRD_WIDTH_GRID_PROPS = { xs: 3, sm: 6, md: 9, xl: 12 };
export const ReadonlyLabelField = ({
  id,
  name,
  label,
  defaultValue,
  readOnly = true,
  gridProps,
  AdditionalInputProps,
  handleChange,
  type,
  error,
  required,
  helperText,
  onBlur,
}: any) => {
  return type == "number" ? (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      <FormControl fullWidth sx={{ m: 0 }}>
        <LLTextFieldNumeric
          error={error}
          required={required}
          helperText={helperText}
          onChange={handleChange ?? console.log}
          id={id}
          name={name}
          label={label}
          defaultValue={defaultValue ?? label}
          onBlur={onBlur}
          InputProps={{
            readOnly: readOnly,
            ...AdditionalInputProps,
          }}
        />
      </FormControl>
    </Grid>
  ) : (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      <FormControl fullWidth sx={{ m: 0 }}>
        <LLTextFieldAlphaNumeric
          error={error}
          required={required}
          helperText={helperText}
          onChange={handleChange ?? console.log}
          id={id}
          name={name}
          label={label}
          defaultValue={defaultValue ?? label}
          onBlur={onBlur}
          InputProps={{
            readOnly: readOnly,
            ...AdditionalInputProps,
          }}
        />
      </FormControl>
    </Grid>
  );
};

export const SwitchCustomWithAGrid = ({
  id,
  name,
  label,
  gridProps,
  checked,
  handleChange,
}: any) => {
  return (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      <FormControl fullWidth sx={{ m: 0 }}>
        <LLSwitch
          id={id}
          name={name}
          label={label}
          checked={checked}
          onChange={handleChange}
        />
      </FormControl>
    </Grid>
  );
};

export const DropdownCustomWithAGrid = ({
  id,
  name,
  label,
  gridProps,
  dropdownItems,
  handleChange,
  defaultValue,
  required,
  error,
  helperText,
  onBlur,
  datatestid
}: any) => {
  return (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      <FormControl fullWidth sx={{ m: 0 }}>
        <LLSelectBox
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          required={required}
          dropdownItems={dropdownItems}
          handleChange={handleChange ?? console.log}
          label={label}
          id={id}
          name={name}
          value={defaultValue}
          showAll={false}
          datatestid={datatestid}
        />
        
      </FormControl>
    </Grid>
  );
};

export const ButtonWithAGrid = ({
  id,
  name,
  label,
  gridProps,
  variant,
  size,
  sx,
}: any) => {
  return (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      {/* <FormControl fullWidth sx={{mb: 2,p:2}}> */}
      <Button
        sx={{ p: 2 }}
        variant={variant}
        color="primary"
        size={size}
        id={id}
        name={name}
      >
        {label}
      </Button>
      {/* </FormControl> */}
    </Grid>
  );
};
export const ButtonWithAGrid1 = ({
  id,
  name,
  label,
  gridProps,
  variant,
  size,
  sx,
  handleClick,
}: any) => {
  return (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      <FormControl fullWidth sx={{ mb: 2, p: 2 }}>
        <Button
          onClick={handleClick}
          variant={variant}
          color="primary"
          size={size}
          id={id}
          name={name}
        >
          {label}
        </Button>
      </FormControl>
    </Grid>
  );
};

export const ReadonlyDateandTimePicker = ({
  id,
  name,
  label,
  defaultValue,
  readOnly = true,
  gridProps,
  onChange,
  onClose,
  error,
  helperText,
}: any) => {
  return (
    <Grid item {...(gridProps ?? { ...FULL_WIDTH_GRID_PROPS })}>
      <FormControl fullWidth sx={{m: 0}} error={error}>
        <LLMobileDatePicker
          id={id}
          label={label}
          readOnly={readOnly}
          value={defaultValue}
          onChange={onChange}
          name={name}
          onClose={onClose}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
