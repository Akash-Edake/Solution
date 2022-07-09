var React = require("react");
// import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Container, Paper, Grid, Divider } from '@mui/material'
import SimpleReactValidator from 'simple-react-validator'
import {
  ButtonWithAGrid1,
  DropdownCustomWithAGrid,
  FORTH_WIDTH_GRID_PROPS,
  HALF_WIDTH_GRID_PROPS,
  ReadonlyDateandTimePicker,
  ReadonlyLabelField,
  SwitchCustomWithAGrid,
  THIRD_WIDTH_GRID_PROPS,
} from '@features/ui-components';
import { states } from './States';
import { getGeneric } from './data';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const EditCompstack = (props: any) => {

  // states
  const [isEdit, setIsEdit] = useState(true);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const formik = useFormik({
    initialValues: {
      market: '',
      subMarket: '',
    },
    validationSchema: Yup.object({
      market: Yup.string().required('Required'),
      subMarket: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const [pageData, setPageData] = useState({
    leaseType: '',
    leaseSqFt: '',
    executionDate: useState<Date | null>(),
    commencementDate: useState<Date | null>(),
    tenantName: '',
    annualBumps: '',
    rentPerSqFt: '',
    termMonths: '',
    tiPerSqFt: '',
    freeRentMonths: '',
    officeSqFt: '',
    note: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    countryId: '',
    country: '',
    zipcode: '',
    ownership: '',
    subMarketId: '',
    subMarketName: '',
    marketName: '',
    propertyUseName: '',
    totalBuildingSqFt:'',
    clearHeight: '',
    yearBuilt: '',
    siteCoverage:'',
    coStarPropertyId:'',
    source:'',
    researchPropertyId:'',
    compstak_compid:'',
    modifiedDate: useState<Date | null>(),
    isDeleted: true,
  });

  const {
    leaseType,
    leaseSqFt,
    executionDate,
    commencementDate,
    tenantName,
    annualBumps,
    rentPerSqFt,
    termMonths,
    tiPerSqFt,
    freeRentMonths,
    officeSqFt,
    note,
    address1,
    address2,
    city,
    state,
    countryId,
    country,
    zipcode,
    ownership,
    subMarketId,
    subMarketName,
    marketName,
    propertyUseName,
    totalBuildingSqFt,
    clearHeight,
    yearBuilt,
    siteCoverage,
    coStarPropertyId,
    source,
    researchPropertyId,
    compstak_compid,
    modifiedDate,
    isDeleted
  } = pageData

  const [allLeaseSourceTypes, setAllLeaseSourceTypes] = useState([]);
  const [allLeaseTypes, setLeaseTypes] = useState([]);
  const [allMarkets, setAllMarkets] = useState([]);
  const [allSubMarkets, setAllSubMarkets] = useState([]);

  // side effects

  useEffect(() => {
    getGeneric(setAllLeaseSourceTypes, 'LeaseSourceTypes');
    getGeneric(setLeaseTypes, 'LeaseTypes');
    getGeneric(setAllMarkets, 'Markets');
    getGeneric(setAllSubMarkets, 'SubMarkets');
    //Properties PropertyUses
  }, []);

  // input handling functions

  const handleChange = (e: any) => {
    setPageData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type == "checkbox" ? e.target.checked : e.target.value,
    }));
    validator.current.showMessageFor(e.target.name);
  };

  const handleDateInput = (name: string, value: Date) => {
    setPageData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validator.current.showMessageFor(name);
  };

  // defining custom rules

  const validator = useRef(
    new SimpleReactValidator({
      validators: {
        executionDateError: {
          message:
            "Commencement Date and Execution Date cannot be equal. Please verify correct dates have been entered.",
          rule: (val: any, params: any[]) =>
            new Date(val).toLocaleDateString("en-US") !==
            new Date(params[0]).toLocaleDateString("en-US"),
        },
        leaseSqftError: {
          // Custom Message
          message:
            "Amount in Lease Sq Ft is greater than expected. Please verify the amount is entered correctly.",
          // Rule Logic
          rule: (val: any) => val > 0 && val <= 3000000,
        },
        commencementDateError: {
          message:
            "Commencement Date and Execution Date cannot be equal. Please verify correct dates have been entered.",
          rule: (val: any, params: any[]) =>
            new Date(val).toLocaleDateString("en-US") !==
            new Date(params[0]).toLocaleDateString("en-US"),
        },
        modifiedDateError: {
          message:
            "Modified Date and Execution Date cannot be equal. Please verify correct dates have been entered.",
          rule: (val: any, params: any[]) =>
            new Date(val).toLocaleDateString("en-US") !==
            new Date(params[0]).toLocaleDateString("en-US"),
        },
        annualBumpsError: {
          message:
            "Amount in Annual Bumps is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        rentPerSqFtError: {
          message:
            "Amount in Rent Per Sq Ft is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        freeRentMonthsError: {
          message:
            "Amount in Free Rent or Months is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        tiPerSqFtError: {
          message:
            "Amount in Ti Per Sq Ft is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        totalBuildingSqFtError: {
          message:
            "Amount in Total Building Sq Ft is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        clearHeightError: {
          message:
            "Amount in Clear Height is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        siteCoverageError: {
          message:
            "Amount in Site Coverage is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        }
      },
      autoForceUpdate: { forceUpdate: forceUpdate },
      element: (message: any) => {
        return message;
      },
    })
  )

  // Error validator for every field

  const leaseTypeError = validator.current.message(
    "leaseType",
    leaseType,
    "required|string"
  );

  const leaseSqftError = validator.current.message(
    "leaseSqFt",
    leaseSqFt,
    "required|numeric|leaseSqftError"
  );
    
  const executionDateError = validator.current.message(
    "executionDate",
    executionDate,
    `executionDateError:${commencementDate}`
  );

  const commencementDateError = validator.current.message(
    "commencementDate",
    commencementDate,
    `commencementDateError:${executionDate}`
  );

  const tenantNameError = validator.current.message(
    "tenantName",
    tenantName,
    "required|alpha_space|max:150,string"
  );

  const annualBumpsError = validator.current.message(
    "annualBumps",
    annualBumps,
    "numeric|annualBumpsError"
  );

  const rentPerSqFtError = validator.current.message(
    "rentPerSqFt",
    rentPerSqFt,
    "required|numeric|rentPerSqFtError"
  );

  const freeRentMonthsError = validator.current.message(
    "freeRentMonths",
    freeRentMonths,
    "numeric|freeRentMonthsError"
  );

  const termMonthsError = validator.current.message(
    "termMonths",
    termMonths,
    "required|numeric"
  );

  const tiPerSqFtError = validator.current.message(
    "tiPerSqFt",
    tiPerSqFt,
    "numeric|tiPerSqFtError"
  );

  const officeSqFtError = validator.current.message(
    "officeSqFt",
    officeSqFt,
    "numeric"
  );
  
  const address1Error = validator.current.message(
    "address1",
    address1,
    "alpha_num_space|max:150,string"
  );

  const address2Error = validator.current.message(
    "address2",
    address2,
    "alpha_num_space|max:150,string"
  );

  const cityError = validator.current.message(
    "city",
    city,
    "alpha_space|max:50,string"
  );

  const stateError = validator.current.message(
    "state",
    state,
    "alpha_space|max:50,string"
  );

  const countryIdError = validator.current.message(
    "countryId",
    countryId,
    "alpha_num_space|max:20,string"
  );

  const countryError = validator.current.message(
    "country",
    country,
    "alpha_space|max:50,string"
  );

  const zipcodeError = validator.current.message(
    "zipcode",
    zipcode,
    "alpha_num_space|max:10,string"
  );

  const ownershipError = validator.current.message(
    "ownership",
    ownership,
    "alpha_num_space|max:150,string"
  );

  const subMarketIdError = validator.current.message(
    "subMarketId",
    subMarketId,
    "alpha_num_space|max:50,string"
  );

  const subMarketNameError = validator.current.message(
    "subMarketName",
    subMarketName,
    "alpha_num_dash_space|max:50,string"
  );

  const marketNameError = validator.current.message(
    "marketName",
    marketName,
    "numeric"
  );

  const propertyUseNameError = validator.current.message(
    "propertyUseName",
    propertyUseName,
    "alpha_space|max:50,string"
  );

  const totalBuildingSqFtError = validator.current.message(
    "totalBuildingSqFt",
    totalBuildingSqFt,
    "numeric|totalBuildingSqFtError"
  );

  const clearHeightError = validator.current.message(
    "clearHeight",
    clearHeight,
    "numeric|clearHeightError"
  );

  const yearBuiltError = validator.current.message(
    "yearBuilt",
    yearBuilt,
    "numeric"
  );

  const siteCoverageError = validator.current.message(
    "siteCoverage",
    siteCoverage,
    "numeric|siteCoverageError"
  );

  const costarPropertyIdError = validator.current.message(
    "coStarPropertyId",
    coStarPropertyId,
    "numeric"
  );

  const sourceError = validator.current.message(
    "source",
    source,
    "alpha_space|max:50,string"
  );

  const researchPropertyIdError = validator.current.message(
    "researchPropertyId",
    researchPropertyId,
    "numeric"
  );

  const compStakError = validator.current.message(
    "compstak_compid",
    compstak_compid,
    "numeric"
  );

  const modifiedDateError = validator.current.message(
    "modifiedDate",
    modifiedDate,
    `modifiedDateError:${executionDate}`
  );

  const noteError = validator.current.message(
    "note",
    note,
    "alpha_num_dash_space|max:500,string"
  );;

  // After Validation Logic

  const handleClick = (e: React.MouseEventHandler) => {
    if (validator.current.allValid()) {
      alert("You submitted the form and stuff!");
      console.log(pageData)
    } else {
      validator.current.showMessages();
      forceUpdate();
    }
  };

  return (
    <div>
      <Box style={{overflowY: 'hidden', overflowX: 'hidden'}}>
        <Container  maxWidth='xl' disableGutters>
          <Paper sx={{mb: 3, p:3}}>
            <Grid
              container
              direction='row'
              pt={0}
              margin={0}
              spacing={{xs: 1, md: 2}}
              columns={{xs: 2, sm: 6, md: 12, xl: 16}}
            >
              <DropdownCustomWithAGrid 
                id={'leaseTypeName'}
                dropdownItems={allLeaseTypes}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Lease Type'}
                readOnly={isEdit}
                defaultValue={leaseType}
                name={'leaseType'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('leaseType')}
                error={!!leaseTypeError}
                helperText={leaseTypeError}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'leaseSqFt'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!leaseSqftError}
                helperText={leaseSqftError}
                label={'Lease Sq Ft'}
                defaultValue={leaseSqFt}
                readOnly={isEdit}
                name={'leaseSqFt'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('leaseSqFt')}
              />
              <ReadonlyDateandTimePicker
                id={"execution-date"}
                gridProps={{ ...FORTH_WIDTH_GRID_PROPS, md: 2, xl: 2 }}
                label={"Execution Date"}
                defaultValue={null}
                readOnly={isEdit}
                onChange={(e: Date) => {
                  handleDateInput("executionDate", e);
                }}
                onBlur={() => validator.current.showMessageFor("executionDate")}
                required={false}
                error={!!executionDateError}
                helperText={executionDateError}
              />
              <ReadonlyDateandTimePicker
                id={"commencement-date"}
                gridProps={{ ...FORTH_WIDTH_GRID_PROPS, md: 2, xl: 2 }}
                label={"Commencement Date"}
                defaultValue={null}
                readOnly={isEdit}
                onChange={(e: Date) => {
                  handleDateInput("commencementDate", e);
                }}
                onBlur={() =>
                  validator.current.showMessageFor("commencementDate")
                }
                required={false}
                error={!!commencementDateError}
                helperText={commencementDateError}
              />
              <ReadonlyLabelField 
                id={'tenantName'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Tenant Name'}
                readOnly={isEdit}
                required={true}
                defaultValue={tenantName}
                name={'tenantName'}
                handleChange={handleChange}
                error={!!tenantNameError}
                helperText={tenantNameError}
                onBlur={() => validator.current.showMessageFor('tenantName')}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'annualBumps'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={false}
                error={!!annualBumpsError}
                helperText={annualBumpsError}
                label={'Annual Bumps'}
                defaultValue={annualBumps}
                readOnly={isEdit}
                name={'annualBumps'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('annualBumps')}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'rentPerSqFt'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!rentPerSqFtError}
                helperText={rentPerSqFtError}
                label={'Rent per Sq Ft'}
                defaultValue={rentPerSqFt}
                readOnly={isEdit}
                name = {'rentPerSqFt'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('rentPerSqFt')}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'termMonths'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!termMonthsError}
                helperText={termMonthsError}
                label={'Term Months'}
                defaultValue={termMonths}
                readOnly={isEdit}
                name={'termMonths'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('termMonths')}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'tiPerSqFt'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={false}
                error={!!tiPerSqFtError}
                helperText={tiPerSqFtError}
                label={'Ti per Sq Ft'}
                defaultValue={tiPerSqFt}
                readOnly={isEdit}
                name={'tiPerSqFt'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('tiPerSqFt')}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'freeRentMonths'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={false}
                error={!!freeRentMonthsError}
                helperText={freeRentMonthsError}
                label={'Free rent months'}
                defaultValue={freeRentMonths}
                readOnly={isEdit}
                name={'freeRentMonths'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('freeRentMonths')}
              />
              <ReadonlyLabelField 
                id={'address1'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Address 1'}
                readOnly={isEdit}
                required={true}
                defaultValue={address1}
                name={'address1'}
                handleChange={handleChange}
                error={!!address1Error}
                helperText={address1Error}
                onBlur={() => validator.current.showMessageFor('address1')}
              />
              <ReadonlyLabelField 
                id={'address2'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Address 2'}
                readOnly={isEdit}
                required={false}
                defaultValue={address2}
                name={'address2'}
                handleChange={handleChange}
                error={!!address2Error}
                helperText={address2Error}
                onBlur={() => validator.current.showMessageFor('address2')}
              />
              <ReadonlyLabelField 
                id={'city'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'City'}
                readOnly={isEdit}
                required={true}
                defaultValue={city}
                name={'city'}
                handleChange={handleChange}
                error={!!cityError}
                helperText={cityError}
                onBlur={() => validator.current.showMessageFor('city')}
              />
              <DropdownCustomWithAGrid 
                id={'state'}
                dropdownItems={states}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'State'}
                readOnly={isEdit}
                defaultValue={state}
                name={'state'}
                handleChange={handleChange}
                error={!!stateError}
                helperText={stateError}
                onBlur={() => validator.current.showMessageFor('state')}
              />
              <ReadonlyLabelField 
                id={'country'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Country'}
                readOnly={isEdit}
                required={true}
                defaultValue={country}
                name={'country'}
                handleChange={handleChange}
                error={!!countryError}
                helperText={countryError}
                onBlur={() => validator.current.showMessageFor('country')}
              />
              <ReadonlyLabelField 
                id={'zipcode'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Zip Code'}
                readOnly={isEdit}
                required={true}
                defaultValue={zipcode}
                name={'zipcode'}
                handleChange={handleChange}
                error={!!zipcodeError}
                helperText={zipcodeError}
                onBlur={() => validator.current.showMessageFor('zipcode')}
              />
              <ReadonlyLabelField
                type={'number'}
                id={'totalBuildingSqFt'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!totalBuildingSqFtError}
                helperText={totalBuildingSqFtError}
                label={'totalBuildingSqFt'}
                defaultValue={totalBuildingSqFt}
                readOnly={isEdit}
                name={'totalBuildingSqFt'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('totalBuildingSqFt')}
              />
              <ReadonlyLabelField 
                id={'countryId'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Country Id'}
                readOnly={isEdit}
                required={true}
                defaultValue={countryId}
                name={'countryId'}
                handleChange={handleChange}
                error={!!countryIdError}
                helperText={countryIdError}
                onBlur={() => validator.current.showMessageFor('countryId')}
              />
              <ReadonlyLabelField
                type={'number'}
                id={'clearHeight'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!clearHeightError}
                helperText={clearHeightError}
                label={'Clear Height'}
                defaultValue={clearHeight}
                readOnly={isEdit}
                name={'clearHeight'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('clearHeight')}
              />
              <ReadonlyLabelField
                type={"number"}
                required={false}
                error={!!officeSqFtError}
                helperText={officeSqFtError}
                id={"officeSqFt"}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={"Office Sq Ft"}
                defaultValue={officeSqFt}
                readOnly={isEdit}
                name={'officeSqFt'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor("officeSqFt")}
            />
              <ReadonlyLabelField
                type={'number'}
                id={'yearBuilt'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!yearBuiltError}
                helperText={yearBuiltError}
                label={'Year Built'}
                defaultValue={yearBuilt}
                readOnly={isEdit}
                name={'yearBuilt'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('yearBuilt')}
              />
              <ReadonlyLabelField
                type={'number'}
                id={'siteCoverage'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!siteCoverageError}
                helperText={siteCoverageError}
                label={'Site Coverage'}
                defaultValue={siteCoverage}
                readOnly={isEdit}
                name={'siteCoverage'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('siteCoverage')}
              />
              <ReadonlyLabelField 
                id={'ownership'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Ownership'}
                readOnly={isEdit}
                required={true}
                defaultValue={ownership}
                name={'ownership'}
                handleChange={handleChange}
                error={!!ownershipError}
                helperText={ownershipError}
                onBlur={() => validator.current.showMessageFor('ownership')}
              />
              <ReadonlyLabelField 
                id={'subMarketId'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Sub Market Id'}
                readOnly={isEdit}
                required={true}
                defaultValue={subMarketId}
                name={subMarketId}
                handleChange={handleChange}
                error={!!subMarketIdError}
                helperText={subMarketIdError}
                onBlur={() => validator.current.showMessageFor('subMarketId')}
              />
              <DropdownCustomWithAGrid 
                id={'subMarketName'}
                dropdownItems={allSubMarkets
                  ?.sort((a: any, b: any) => a.code.localeCompare(b.code))
                  .filter((x: any) => x.marketId === formik.values.market)
                  .map((x: any, i: any) => {
                    return { value: x.subMarketId, key: x.name };
                  })}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Sub Market Name'}
                readOnly={isEdit}
                name={'subMarketName'}
                handleChange={handleChange}
                error={!!subMarketNameError}
                helperText={subMarketNameError}
                onBlur={() => validator.current.showMessageFor('subMarketName')}
              />
              <DropdownCustomWithAGrid 
                id={'marketName'}
                dropdownItems={allMarkets
                  ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                  .map((x: any) => {
                    return { key: x.name, value: x.marketId };
                  })}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Market Name'}
                readOnly={isEdit}
                name={'marketName'}
                handleChange={handleChange}
                error={!!marketNameError}
                helperText={marketNameError}
                onBlur={() => validator.current.showMessageFor('marketName')}
              />
              <ReadonlyLabelField 
                id={'propertyUseName'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'property Use Name'}
                readOnly={isEdit}
                required={false}
                defaultValue={propertyUseName}
                name={'propertyUseName'}
                handleChange={handleChange}
                error={!!propertyUseNameError}
                helperText={propertyUseNameError}
                onBlur={() => validator.current.showMessageFor('propertyUseName')}
              />
              
              <ReadonlyLabelField 
                type={'number'}
                id={'coStarPropertyId'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={false}
                error={!!costarPropertyIdError}
                helperText={costarPropertyIdError}
                label={'co Star Property id'}
                defaultValue={coStarPropertyId}
                readOnly={isEdit}
                name={'coStarPropertyId'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('coStarPropertyId')}
              />
              <DropdownCustomWithAGrid 
                id={'source'}
                dropdownItems={allLeaseSourceTypes}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                label={'Source'}
                readOnly={isEdit}
                error={!!sourceError}
                helperText={sourceError}
                defaultValue={source}
                name={'source'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('source')}
              />
              
              <ReadonlyLabelField 
                type={'number'}
                id={'researchPropertyId'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={false}
                error={!!researchPropertyIdError}
                helperText={researchPropertyIdError}
                label={'Research property'}
                defaultValue={researchPropertyId}
                readOnly={isEdit}
                name={'researchPropertyId'}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('researchPropertyId')}
              />
              <ReadonlyLabelField 
                type={'number'}
                id={'compstak_compid'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                required={true}
                error={!!compStakError}
                helperText={compStakError}
                label={'Compstak compid'}
                defaultValue={compstak_compid}
                name={'compstak_compid'}
                readOnly={isEdit}
                handleChange={handleChange}
                onBlur={() => validator.current.showMessageFor('compstak_compid')}
              />
              <ReadonlyDateandTimePicker
                id={"modifiedDate"}
                gridProps={{ ...FORTH_WIDTH_GRID_PROPS, md: 2, xl: 2 }}
                label={"Modified Date"}
                defaultValue={null}
                readOnly={isEdit}
                onChange={(e: any) => {
                  handleDateInput("modifiedDate",e);
                }}
                onBlur={() => validator.current.showMessageFor("modifiedDate")}
                required={true}
                error={!!modifiedDateError}
                helperText={modifiedDateError}
              />
              <ReadonlyLabelField 
                id={'note'}
                gridProps={THIRD_WIDTH_GRID_PROPS}
                label={'Note'}
                readOnly={isEdit}
                required={true}
                defaultValue={note}
                name={'note'}
                handleChange={handleChange}
                error={!!noteError}
                helperText={noteError}
                onBlur={() => validator.current.showMessageFor('note')}
              />
              <SwitchCustomWithAGrid
                checked={isDeleted}
                gridProps={FORTH_WIDTH_GRID_PROPS}
                id={'isDeleted'}
                label={'Is deleted'}
                name={'isDeleted'}
                handleChange={handleChange}
              />
            </Grid>
              <Divider sx={{mt: 3}} />
            <Grid
              container
              direction="row"
              justifyContent={'flex-end'}
              pt={0}
              margin={0}
              spacing={{xs: 1, md: 2}}
              columns={{xs: 4, sm: 8, md: 12, xl: 16}}
            >
              <ButtonWithAGrid1
                variant="text"
                id={'cancel'}
                label={'Cancel'}
                gridProps={FORTH_WIDTH_GRID_PROPS}
              />
              <ButtonWithAGrid1
                variant="contained"
                size="large"
                id={'save'}
                label={'Save'}
                handleClick={handleClick}
                gridProps={FORTH_WIDTH_GRID_PROPS}
              />
            </Grid>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}

export { EditCompstack };