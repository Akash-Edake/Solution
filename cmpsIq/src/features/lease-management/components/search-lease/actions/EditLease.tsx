/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-key */
import {Box, Container, FormControl, Grid, Icon, IconButton, Paper, TextField} from '@mui/material';
// import DateAndTimePicker from 'components/shared/ui-elements/DateAndTimePicker';
import {LLMobileDatePicker} from '@features/ui-components';
import React, {useState} from 'react';

const FULL_WIDTH_GRID_PROPS = {xs: 4, sm: 8, md: 12, xl: 16};
const HALF_WIDTH_GRID_PROPS = {xs: 2, sm: 4, md: 6, xl: 8};
const ReadonlyLabelField = ({id, label, defaultValue, readOnly = true, gridProps}: any) => {
  return (
    <Grid item {...(gridProps ?? {...FULL_WIDTH_GRID_PROPS})}>
      <FormControl fullWidth sx={{m: 0}}>
        <TextField
          id={id}
          label={label}
          defaultValue={defaultValue ?? label}
          InputProps={{
            readOnly: readOnly,
          }}
        />
      </FormControl>
    </Grid>
  );
};

const ReadonlyDateandTimePicker = ({id, label, defaultValue, readOnly = true, gridProps,onChange}: any) => {
  return (
    <Grid item {...(gridProps ?? {...FULL_WIDTH_GRID_PROPS})}>
      <FormControl fullWidth sx={{m: 0}}>
    <LLMobileDatePicker
    readOnly={readOnly}
label={label}
value={defaultValue}
onChange={onChange}
/>
</FormControl>
    </Grid>
    );
  };


const EditLease = (props: any) => {
  const [isEdit, setIsEdit] = useState(true);

  const data = props.row.row.original;
  const propertyDetails = `Name: ${data.Name ?? ''} | Address: ${data.Address1 ?? ''}, ${
    data.Address2 ?? ''
  }, ${data.City ?? ''}, ${data.State ?? ''}`;
  return (
    <Box>
      <Container maxWidth="xl" disableGutters>
        <Paper sx={{mb: 3, p: 3}}>
          <Grid
            container
            direction="row"
            pt={0}
            margin={0}
            spacing={{xs: 1, md: 2}}
            columns={{xs: 4, sm: 8, md: 12, xl: 16}}
            justifyContent="flex-end"
          >
            <IconButton
              size="small"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              <Icon fontSize="small">{isEdit ? 'edit' : 'save'}</Icon>
            </IconButton>
          </Grid>
          <Grid
            container
            direction="row"
            pt={0}
            margin={0}
            spacing={{xs: 1, md: 2}}
            columns={{xs: 4, sm: 8, md: 12, xl: 16}}
          >
            <ReadonlyLabelField
              id={'property-details'}
              label={'Property Details'}
              defaultValue={propertyDetails}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'annual-bumps'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Annual Bumps'}
              defaultValue={data.AnnualBumps}
              readOnly={isEdit}
            />
            <ReadonlyDateandTimePicker
              id={'commencement-date'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Commencement Date'}
              defaultValue={data.LeaseCommencementDate}
              readOnly={isEdit}
              onChange={(newVal: any) => {}}
            />
            <ReadonlyDateandTimePicker
              id={'execution-date'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Execution Date'}
              defaultValue={data.LeaseExecutionDate}
              readOnly={isEdit}
              onChange={(newVal: any) => {}}
            />
            <ReadonlyLabelField
              id={'free-rent-months'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Free Rent Months'}
              defaultValue={data.FreeRentMonths}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'lease-source'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Lease Source'}
              defaultValue={data.LeaseSourceTypeName}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'lease-type'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Lease Type'}
              defaultValue={data.LeaseTypeName}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'generation'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Generation'}
              defaultValue={data.LeaseGenerationName}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'opex-per-sq-ft'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'OpEx per Sq Ft'}
              defaultValue={data.OpExPerSqFt}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'lease-sq-ft'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Lease Sq Ft'}
              defaultValue={data.LeaseSqFt}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'term-months'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Term, months'}
              defaultValue={data.TermMonths}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'lease-structure'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Lease Structre'}
              defaultValue={data.LeaseStructureName}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'rent-per-sq-ft'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Rent Per Sq Ft'}
              defaultValue={data.RentPerSqFt}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'temp-controlled'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Temperature Controlled'}
              defaultValue={data.TemperatureControlled}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'tenant-name'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Tenant Name'}
              defaultValue={data.Tenant}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'tenant-type'}
              label={'Tenant Type'}
              defaultValue={data.TenantTypeName}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'ti-per-sq-ft'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'TI per SqFt'}
              defaultValue={data.TiPerSqFt}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'office-sq-ft'}
              gridProps={HALF_WIDTH_GRID_PROPS}
              label={'Office Sq Ft'}
              defaultValue={data.OfficeSqFt}
              readOnly={isEdit}
            />
            <ReadonlyLabelField
              id={'notes'}
              label={'Notes'}
              defaultValue={data.Note}
              readOnly={isEdit}
            />
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditLease;
