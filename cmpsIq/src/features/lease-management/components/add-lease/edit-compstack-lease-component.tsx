import { Box, Container, Divider, Grid, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { styled } from '@mui/material/styles';
import { CustomizedSnackbars } from "@features/ui-components";
import { useParams } from "react-router-dom";
// import AddPropertyFormik from "./AddPropertyFormik";
import { getMetaData,getCompstackLeaseDetails,getPropertyDetails} from "./data";
import { useNavigate } from "react-router-dom";

import {
  ButtonWithAGrid1,
  DropdownCustomWithAGrid,
  FORTH_WIDTH_GRID_PROPS,
  HALF_WIDTH_GRID_PROPS,
  ReadonlyDateandTimePicker,
  ReadonlyLabelField,
  SwitchCustomWithAGrid,
  THIRD_WIDTH_GRID_PROPS,
} from "@features/ui-components";
import PropertyAutoComplete from "./PropertyAutoComplete";
import { ApiConnectCallback,post,put } from "@features/api-connect";
import { PropaneSharp } from "@mui/icons-material";


const EditCompstackLease = (props: any) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  let navigate = useNavigate(); 
 
  //  const [currentDateSet,setCurrentDateSet]
const[isopen,setIsOpen]=useState(false);
  const [allLeaseSourceTypes, setAllLeaseSourceTypes] = useState([]);
  const [allLeaseStructures, setAllLeaseStructures] = useState([]);
  const [allLeaseGenerations, setAllLeaseGenerations] = useState([]);
  const [allLeaseTypes, setLeaseTypes] = useState([]);
  const [allTenantTypes, setAllTenantTypes] = useState([]);
  const [allMarkets, setAllMarkets] = useState([]);
  const [allSubMarkets, setAllSubMarkets] = useState([]);
const[successSnackOpen,setSuccessSnackOpen]=useState(false);
const[errorSnackOpen,setErrorSnackOpen]=useState(false);

  const [propertyDetails, setPropertyDetails] = useState( {
    address1:"",
    address2:"",
    city:"",
    property_name:"",
    state:"",
    zipCode:"",
    county:"",
    // latitude: number,
    // longitude: number,
    clearHeight:"",
    market:"",
    ownership:"",
    propertyId:"",
    siteCoverage:"",
    subMarket:"",
    subMarketId:"",
    marketId:"",
    totalBuildingSqft:"",
    yearBuilt:""});
  const [pageData, setPageData] = useState({
    leaseId: 0,
    tenant:"",
    tenantTypeId: "",
    leaseExecutionDate: null,//new Date(),
    leaseCommencementDate:null,//new Date().setDate(new Date().getDate() + 1),
    leaseSourceTypeId: 1,
    leaseTypeName: "",
    leaseGenerationId: "",
    leaseSqft: "",
    rentPerSqft: "",
    leaseStructureId: "",
    termMonths: "",
    officeSqft: "",
    annualBumps: "",
    tiPerSqFt: "",
    freeRentMonths: "",
    // opExPerSqFt: "",
    temperatureControlled: true,
    note: "",
    propertyId: "",
    createdBy: "Dwayn Jhonson",
    modifiedBy:"Dwayn Jhonson",
    createdDate: new Date(),
    modifiedDate: new Date(),
    monthlyRentperSqFt:"",
    marketName:"",
    subMarketName:"",
    ownership:"",
    clearHeight:"",
    yearBuilt:"",
    siteCoverage:"",
    totalBuildingSqft:"",
    address1:"",
    address2:"",
    state:"",
    zipCode:"",
  });

 
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    ...theme.typography.body2,
  }));
  // Side Effects
const metaDataSetter=(data:any)=>{
  
  // setAllLeaseGenerations(data.leaseGenerations)
  // setAllLeaseStructures(data.leaseStructures)
  setLeaseTypes(data.leaseTypes)
  // setAllTenantTypes(data.tenantTypes)
}
const leaDataSetter=(data:any)=>{
  
  data.monthlyRentperSqFt=parseInt(data.rentPerSqft) /12;
setPageData(data)
getPropertyDetails(setPropertyDetails,data.propertyId)
}
  useEffect(() => {
    getMetaData(metaDataSetter,"compstack")
    if(props.id!=undefined){
      getCompstackLeaseDetails(leaDataSetter,props.id)
      setIsEdit(props.varient=="VIEW");
      
    }
    // getGeneric(setAllLeaseSourceTypes, "LeaseSourceTypes");
    // getGeneric(setAllLeaseStructures, "LeaseStructures"); //
    // getGeneric(setAllLeaseGenerations, "LeaseGenerations");
    // getGeneric(setLeaseTypes, "LeaseTypes");
    // getGeneric(setAllTenantTypes, "TenantTypes");
    // getGeneric(setAllMarkets, "Markets");
    // getGeneric(setAllSubMarkets, "SubMarkets");
    //Properties PropertyUses
  }, []);

  // Input handling Functions

  const handleDateInput = (name: string, value: Date) => {
    
    setPageData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validator.current.showMessageFor(name);
  };

  const handleInput = (e: any) => {
    if(e.persist){
      e.persist();
    }
    setPageData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type == "checkbox" ? e.target.checked : e.target.value,
    }));
    validator.current.showMessageFor(e.target.name);
  };

  const setState = (name: string, value: any) => {
    setPageData((prevState) => ({
      ...prevState,
      [name]:value
    }));
  };

  // Defining Custom Rules.

  const validator = useRef(
    new SimpleReactValidator({
      // Custom Rules
      validators: {
        // RuleName
        leaseSqftError: {
          // Custom Message
          message:
            "Amount in Lease Sq Ft is greater than expected. Please verify the amount is entered correctly.",
          // Rule Logic
          rule: (val: any) => val > 0 && val <= 3000000,
        },
        // End Of Rule.
        AnnualBumpsError: {
          message:
            "Amount in Annual Bumps is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        // opExperSqFtError: {
        //   message:
        //     "Amount in OpEx Per Sq Ft is greater than expected. Please verify the amount is entered correctly.",
        //   rule: (val: any) => val > 0 && val <= 9999999.99,
        // },
        annualRentperSqFtError: {
          message:
            "Amount in Annual Rent Per Sq Ft is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        freeRentMonthsError: {
          message:
            "Amount in Free Rent or Months is greater than expected. Please verify the amount is entered correctly.",
          rule: (val: any) => val > 0 && val <= 9999999.99,
        },
        executionDateError: {
          message:
            "Commencement Date and Execution Date cannot be equal. Please verify correct dates have been entered.",
          rule: (val: any, params: any[]) =>
            new Date(val).toLocaleDateString("en-US") !==
            new Date(params[0]).toLocaleDateString("en-US"),
        },
        commencementDateError: {
          message:
            "Commencement Date and Execution Date cannot be equal. Please verify correct dates have been entered.",
          rule: (val: any, params: any[]) =>
            new Date(val).toLocaleDateString("en-US") !==
            new Date(params[0]).toLocaleDateString("en-US"),
        },
        // bothDateError: {
        //   message:
        //     "Commencement Date and Execution Date both cannot be empty. Please enter any one of them.",
        //   rule: (val: any, params: any[]) => console.log(params),
        // },
      },
      autoForceUpdate: { forceUpdate: forceUpdate },
      element: (message: any) => {
        return message;
      },
    })
  );

  // Error Validator for Every Field.

  // const propertyDetailsError=validator.current.message('propertyDetails', propertyDetails, 'required');
  const leaseTypeError = validator.current.message(
    "leaseType",
    pageData.leaseTypeName,
    "required"
  );
  // const leaseStructureError = validator.current.message(
  //   "leaseStructure",
  //   pageData.leaseStructureId,
  //   "required"
  // );
  const leaseSqftError = validator.current.message(
    "leaseSqft",
    pageData.leaseSqft,
    "required|numeric|leaseSqftError"
  );

  // const generationError = validator.current.message(
  //   "generation",
  //   pageData.leaseGenerationId,
  //   "required"
  // );
  const executionDateError = validator.current.message(
    "executionDate",
    pageData.leaseExecutionDate,
    "executionDateError:" + pageData.leaseCommencementDate
  );
  const commencementDateError = validator.current.message(
    "commencementDate",
    pageData.leaseCommencementDate,
    "commencementDateError:" +
    pageData.leaseExecutionDate 
    // +
      // "|bothDateError:" +
      // pageData.leaseExecutionDate +
      // "," +
      // pageData.leaseCommencementDate
  );
  const tenantNameError = validator.current.message(
    "tenantName",
    pageData.tenant,
    "required|alpha_space|max:120,string"
  );
  // const tenantTypeError = validator.current.message(
  //   "tenantType",
  //   pageData.tenantTypeId,
  //   "required"
  // );
  const AnnualBumpsError = validator.current.message(
    "AnnualBumps",
    pageData.annualBumps,
    "numeric|AnnualBumpsError"
  );
  // const opExperSqFtError = validator.current.message(
  //   "opExperSqFt",
  //   pageData.opExPerSqFt,
  //   "numeric|opExperSqFtError"
  // );
  const annualRentperSqFtError = validator.current.message(
    "annualRentperSqFt",
    pageData.rentPerSqft,
    "required|numeric|annualRentperSqFtError"
  );
  const termMonthsError = validator.current.message(
    "termMonths",
    pageData.termMonths,
    "required|numeric"
  );
  const tiperSqFtError = validator.current.message(
    "tiperSqFt",
    pageData.tiPerSqFt,
    "numeric"
  );
  const freeRentMonthsError = validator.current.message(
    "freeRentMonths",
    pageData.freeRentMonths,
    "numeric|freeRentMonthsError"
  );
  const officesqftError = validator.current.message(
    "officesqft",
    pageData.officeSqft,
    "numeric"
  );
  const notesError = validator.current.message(
    "notes",
    pageData.note,
    "alpha_num_dash_space|max:500,string"
  );

  // After Validation Logic

  const handleClick = (e: React.MouseEventHandler) => {
    
    if (validator.current.allValid()) {
      
      let _pageData={...pageData};
      delete _pageData['monthlyRentperSqFt']
      const  ApiConnectCallback:ApiConnectCallback={
        url:props.id==undefined?"CompStakLease/create":"CompStakLease/update",
        data:{..._pageData},
    successsCallback:(response:any):void=>{
     if(props.id ){
      setSuccessSnackOpen(true)
     }
     else{
      navigate("/researchIQ");}
    },
    failureCallback:(response:any):void=>{setErrorSnackOpen(true)}
    }
    if(props.id==undefined){
    post(ApiConnectCallback);}
    else{put(ApiConnectCallback);}
      // postLease("https://comps-api-test-win.azurewebsites.net/lease/create",pageData)
    } else {
      validator.current.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      forceUpdate();
    }
    console.log(pageData);
  };
const setDetails=(details:any)=>{
  
  
console.log("details",details);
setPropertyDetails(details?details:{
  address1:"",
  address2:"",
  city:"",
  property_name:"",
  state:"",
  zipCode:"",
  county:"",
  // latitude: number,
  // longitude: number,
  clearHeight:"",
  market:"",
  ownership:"",
  propertyId:"",
  siteCoverage:"",
  subMarketName:"",
  subMarketId:"",
  marketId:"",
  totalBuildingSqft:"",
  yearBuilt:"",
})
  let _pageData={...pageData};
  _pageData.propertyId=details?details.propertyId:0
  _pageData.marketName=details?details.marketName:""
  _pageData.subMarketName=details?details.subMarketName:""
  _pageData.ownership=details?details.ownership:""
  _pageData.clearHeight=details?details.clearHeight:""
  _pageData.yearBuilt=details?details.yearBuilt:""
  _pageData.siteCoverage=details?details.siteCoverage:"",
  _pageData.totalBuildingSqft=details?details.totalBuildingSqft:"",
  setPageData(_pageData);
}
  return (
    <>

    {isEdit?<div style={{position:"absolute",width:"97%",height:"375px", zIndex:"1200"}}></div>:null}
    <Box style={{ overflowY: "hidden", overflowX: "hidden" }}>
    <CustomizedSnackbars
    open={errorSnackOpen}
    autoHideDuration={1000}
    severity={"error"}
    message="Somethig went wrong."
    />
     <CustomizedSnackbars
    open={successSnackOpen}
    autoHideDuration={1000}
    severity={"success"}
    message="Lease Saved."
    />
     
     
      <Container maxWidth="xl" disableGutters>
        <Paper sx={{ mb: 3, p: 3 }}>
          <Grid
            container
            direction="row"
            pt={0}
            margin={0}
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 2, sm: 6, md: 12, xl: 16 }}
          >
            {props.id==undefined?
            <PropertyAutoComplete
              gridProps={{
                ...THIRD_WIDTH_GRID_PROPS,
                xs: 2,
                sm: 5,
                md: 11,
                xl: 14,
              }}
              setPropertyDetails={setDetails}
            />: <ReadonlyLabelField
            id={"Proprty"}
            label={"Property"}
            defaultValue={`${pageData?.address1},${pageData?.address2},${pageData?.state},${pageData.zipCode} | ${pageData?.ownership}`}
            name={"property"}
            gridProps={{
              ...THIRD_WIDTH_GRID_PROPS,
              xs: 2,
              sm: 5,
              md: 11,
              xl: 14,
            }}
            readOnly={true}
          />}
            {/* <AddProperty
              gridProps={FORTH_WIDTH_GRID_PROPS}
              allMarkets={allMarkets}
              allSubMarkets={allSubMarkets}
              title={'Add New Property For Lease'} 
            /> */}
            {/* <AddPropertyFormik
              allMarkets={allMarkets}
              allSubMarkets={allSubMarkets}
            /> */}
            {pageData.marketName!="" && pageData.marketName!=null?
        <Grid container sx={{paddingLeft:2, paddingTop:2}} spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }}>

          
          <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item>Ownership :  <b>{pageData.ownership}</b></Item>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item>Market :  <b>{pageData.marketName}</b></Item>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item>Sub Market : <b>{pageData.subMarketName}</b></Item>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item>Total Building Sq Ft : <b>{pageData.totalBuildingSqft}</b></Item>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item> Site Coverage : <b>{pageData.siteCoverage}</b></Item>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item>Clear Height : <b>{pageData.clearHeight}</b></Item>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} >
              <Item> Year Built : <b>{pageData.yearBuilt}</b></Item>
            </Grid>
      
        </Grid>:null}
  
            <DropdownCustomWithAGrid
              aria-labelledby={'lease-type'}
              required={true}
              error={!!leaseTypeError}
              helperText={leaseTypeError}
              dropdownItems={allLeaseTypes}
              id={"lease-type"}
              name={"leaseTypeName"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Lease Type"}
              defaultValue={pageData.leaseTypeName}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("leaseType")}
              datatestid="lease-type"
            />
            {/* <DropdownCustomWithAGrid
              required={true}
              error={!!leaseStructureError}
              helperText={leaseStructureError}
              dropdownItems={allLeaseStructures}
              id={"lease-structure"}
              name={"leaseStructureId"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Lease Structure"}
              defaultValue={pageData.leaseStructureId}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("leaseStructure")}
              datatestid="lease-structure"
            /> */}
            <ReadonlyLabelField
              type={"number"}
              id={"lease-sq-ft"}
              name={"leaseSqft"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              required={true}
              error={!!leaseSqftError}
              helperText={leaseSqftError}
              label={"Lease Sq Ft"}
              defaultValue={pageData.leaseSqft}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("leaseSqft")}
            />
            {/* <DropdownCustomWithAGrid
              required={true}
              error={!!generationError}
              helperText={generationError}
              dropdownItems={allLeaseGenerations}
              id={"generation"}
              name={"leaseGenerationId"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Generation"}
              defaultValue={pageData.leaseGenerationId}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("generation")}
            /> */}

            <ReadonlyDateandTimePicker
              id={"execution-date"}
              gridProps={{ ...FORTH_WIDTH_GRID_PROPS, md: 2, xl: 2 }}
              label={"Execution Date"}
              name={"leaseExecutionDate"}
              defaultValue={pageData.leaseExecutionDate}
              readOnly={isEdit}
              onChange={(e: Date) => {
                handleDateInput("leaseExecutionDate", e);
              }}
              onClose={() => validator.current.showMessageFor("executionDate")}
              //required={true}
              error={!!executionDateError}
              helperText={executionDateError}
            />
            <ReadonlyDateandTimePicker
              id={"commencement-date"}
              name={"leaseCommencementDate"}
              gridProps={{ ...FORTH_WIDTH_GRID_PROPS, md: 2, xl: 2 }}
              label={"Commencement Date"}
              defaultValue={pageData.leaseCommencementDate}
              readOnly={isEdit}
              onChange={(e: Date) => {
                handleDateInput("leaseCommencementDate", e);
              }}
              onClose={() => {
                validator.current.showMessageFor("commencementDate");
              }}
              //required={false}
              error={!!commencementDateError}
              helperText={commencementDateError}
            />
            <ReadonlyLabelField
              id={"tenant-name"}
              name={"tenant"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Tenant Name"}
              defaultValue={pageData.tenant}
              readOnly={isEdit}
              handleChange={handleInput}
              required={true}
              error={!!tenantNameError}
              helperText={tenantNameError}
              onBlur={() => validator.current.showMessageFor("tenantName")}
            />
            {/* <DropdownCustomWithAGrid
              required={true}
              error={!!tenantTypeError}
              helperText={tenantTypeError}
              dropdownItems={allTenantTypes}
              id={"tenant-type"}
              name={"tenantTypeId"}
              gridProps={{ ...HALF_WIDTH_GRID_PROPS, md: 5 }}
              label={"Tenant Type"}
              defaultValue={pageData.tenantTypeId}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("tenantType")}
            /> */}
            <ReadonlyLabelField
              type={"number"}
              required={false}
              error={!!AnnualBumpsError}
              helperText={AnnualBumpsError}
              id={"annual-bumps"}
              name={"annualBumps"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Annual Bumps"}
              defaultValue={pageData.annualBumps}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("AnnualBumps")}
            />

            {/* <ReadonlyLabelField
              type={"number"}
              required={false}
              error={!!opExperSqFtError}
              helperText={opExperSqFtError}
              id={"opex-per-sq-ft"}
              name={"opExPerSqFt"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"OpEx per Sq Ft"}
              defaultValue={pageData.opExPerSqFt}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("opExperSqFt")}
            /> */}

            <ReadonlyLabelField
              type={"number"}
              required={true}
              error={!!annualRentperSqFtError}
              helperText={annualRentperSqFtError}
              id={"annual-rent-per-sq-ft"}
              name={"rentPerSqft"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Annual Rent Per Sq Ft"}
              defaultValue={pageData.rentPerSqft}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={(e: any) => {
                validator.current.showMessageFor("annualRentperSqFt");
                setState("monthlyRentperSqFt", Number(e.target.value) / 12);
              }}
            />

            <ReadonlyLabelField
              type={"number"}
              required={true}
              error={!!termMonthsError}
              helperText={termMonthsError}
              id={"term-months"}
              name={"termMonths"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Term, months"}
              defaultValue={pageData.termMonths}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("termMonths")}
            />

            <ReadonlyLabelField
              type={"number"}
              required={false}
              error={!!tiperSqFtError}
              helperText={tiperSqFtError}
              id={"ti-per-sq-ft"}
              name={"tiPerSqFt"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"TI per SqFt"}
              defaultValue={pageData.tiPerSqFt}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("tiperSqFt")}
            />
            <ReadonlyLabelField
              type={"number"}
              required={false}
              error={!!freeRentMonthsError}
              helperText={freeRentMonthsError}
              id={"free-rent-months"}
              name={"freeRentMonths"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Free Rent Months"}
              defaultValue={pageData.freeRentMonths}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("freeRentMonths")}
            />

            <ReadonlyLabelField
              type={"number"}
              required={false}
              error={!!officesqftError}
              helperText={officesqftError}
              id={"office-sq-ft"}
              name={"officeSqFt"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              label={"Office Sq Ft"}
              defaultValue={pageData.officeSqft}
              readOnly={isEdit}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("officesqft")}
            />
            {/* <SwitchCustomWithAGrid
              required={false}
              checked={pageData.temperatureControlled}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              id={"temp-controlled"}
              name={"temperatureControlled"}
              label={"Temp Controlled"}
              handleChange={handleInput}
            /> */}
            <ReadonlyLabelField
              required={false}
              id={"notes"}
              name={"note"}
              label={"Notes"}
              defaultValue={pageData.note}
              gridProps={THIRD_WIDTH_GRID_PROPS}
              readOnly={isEdit}
              error={!!notesError}
              helperText={notesError}
              handleChange={handleInput}
              onBlur={() => validator.current.showMessageFor("notes")}
            />
            <ReadonlyLabelField
              id={"monthly-rent-per-sq-ft "}
              label={"Monthly Rent per Sq Ft "}
              defaultValue={pageData.monthlyRentperSqFt}
              name={"monthlyRentperSqFt"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              readOnly={true}
            />
          </Grid>
          <Divider sx={{ mt: 3 }} />
          <Grid
            container
            direction="row"
            justifyContent={"flex-end"}
            pt={0}
            margin={0}
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12, xl: 16 }}
          >
            {props.varient==undefined?
            <ButtonWithAGrid1
              variant="text"
              id={"cancel"}
              label={"Cancel"}
              gridProps={FORTH_WIDTH_GRID_PROPS}
              handleClick={()=>{navigate("/researchIQ")}}
            />:null}
             {props.varient!="VIEW"?
            <ButtonWithAGrid1
              variant="contained"
              size="large"
              id={"save"}
              label={"Save"}
              handleClick={handleClick}
              gridProps={FORTH_WIDTH_GRID_PROPS}
            />:null}
          </Grid>
        </Paper>
      </Container>
    </Box>
    </>
  );
};

export  {EditCompstackLease};
