import { Box, Container, Grid, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { states } from "./States";
import { county } from "./County";
import { LLCustomizedDialogs } from "../../ui-components/components/customized-dialogs";
import { CustomizedSnackbars } from "../../ui-components/components/snack-bar";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  ButtonWithAGrid1,
  DropdownCustomWithAGrid,
  FORTH_WIDTH_GRID_PROPS,
  HALF_WIDTH_GRID_PROPS,
  ReadonlyLabelField,
  YearSelectorWithCustomGrids,
} from "./Helpers";
import { useEffect, useState } from "react";
import { getMetaData } from "./data";
import { useNavigate } from "react-router-dom";
import { ApiConnectCallback, post, put } from "@features/api-connect";

// const validate = (values: any) => {
//   const errors: any = {};
//   if (!values.market) {
//     errors.market = "Required";
//   }
//   return errors;
// };

const ButtonWithAGrid = ({ id, label, variant, size, sx, onClick }: any) => {
  return (
    <Button
      sx={{ p: 2 }}
      onClick={onClick}
      variant={variant}
      color="primary"
      size={size}
      id={id}
    >
      {label}
    </Button>
  );
};

export default function AddPropertyFormik(props: any) {
  const [successSnackOpen, setSuccessSnackOpen] = useState(false);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);
  const [allMarkets, setAllMarkets] = useState([]);
  const [allSubMarkets, setAllSubMarkets] = useState([]);

  const metaDataSetter = (data: any) => {
    setAllMarkets(data.markets);
    setAllSubMarkets(data.subMarkets);
  };

  useEffect(() => {
    getMetaData(metaDataSetter);
  }, []);

  const formik = useFormik({
    initialValues: {
      propertyId: 0,
      alternateKey: "",
      subMarketId: "",
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      county: "",
      zipCode: "",
      totalBuildingSqFt: "",
      ownership: "",
      clearHeight: "",
      yearBuilt: "",
      siteCoverage: "",
      createdBy: "Tejas",
      modifiedBy: "Tejas",
      createdDate: "2022-06-07T12:51:59.042Z",
      modifiedDate: "2022-06-07T12:51:59.042Z",
      market: "",
      subMarket: "",
    },
    validationSchema: Yup.object({
      market: Yup.string().required("The market field is required"),
      subMarket: Yup.string().required("The submarket field is required"),
      name: Yup.string().required("The property name field is required"),
      address1: Yup.string().required("The street address filed is required"),
      city: Yup.string().required("The city field is required"),
      state: Yup.string().required("The state field is required"),
      county: Yup.string().required("The county field is required"),
      zipCode: Yup.string().required("The zipcode field is equired"),
      totalBuildingSqFt: Yup.string().required(
        "The total sqft field is required"
      ),
      ownership: Yup.string().required("The ownership field is required"),
      clearHeight: Yup.string().required("The clear height field is required"),
      yearBuilt: Yup.string().required("The year built field is required"),
      siteCoverage: Yup.string().required(
        "The site coverage field is required"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      let FormState = { ...values };

      FormState.subMarketId = FormState.subMarket;
      allMarkets.forEach((x) => {
        if (x.id == FormState.market) FormState.market = x.name;
      });
      allSubMarkets.forEach((x) => {
        if (x.id == FormState.subMarket) FormState.subMarket = x.name;
      });

      const ApiConnectCallback: ApiConnectCallback = {
        url: "property/create",
        data: { ...FormState },
        // data: { "Failedtest": "Failedtest" },
        successsCallback: (response: any): void => {
          resetForm();
          setSuccessSnackOpen(true);
        },
        failureCallback: (response: any): void => {
          setErrorSnackOpen(true);
        },
      };
      post(ApiConnectCallback);
    },
  });

  //   const canShowError= (key: any)=>{
  //       return !!formik.errors[key] && !!formik.touched[key];
  //   };

  return (
    // <LLCustomizedDialogs
    //   actions={
    //     <ButtonWithAGrid
    //       sx={{}}
    //       id={"add-property"}
    //       label={"+Property"}
    //       size="small"
    //       name={"Add"}
    //     />
    //   }
    //   gridProps={{ ...FORTH_WIDTH_GRID_PROPS, xs: 1, sm: 1, md: 1, xl: 2 }}
    //   title={"Add New Property For Lease"}
    // >

    <LLCustomizedDialogs
      actions={"+Property"}
      title="Property"
    >
      <Box>
        <Container maxWidth="xl" disableGutters>
          <Paper sx={{ mb: 3, p: 3 }}>
            <Grid
              container
              direction="row"
              pt={0}
              margin={0}
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12, xl: 16 }}
            >
              {/* <form onSubmit={formik.handleSubmit}> */}
              <DropdownCustomWithAGrid
                required={true}
                error={!!formik.errors.market && !!formik.errors.market}
                helperText={
                  !!formik.errors.market && !!formik.touched.market
                    ? formik.errors.market
                    : null
                }
                dropdownItems={allMarkets
                  // ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                  .map((x: any) => {
                    return { key: x.name, value: x.id };
                  })}
                name={"market"}
                id={"market"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Market"}
                defaultValue={formik.values.market}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <DropdownCustomWithAGrid
                required={true}
                error={!!formik.errors.subMarket && !!formik.touched.subMarket}
                helperText={
                  !!formik.errors.subMarket && !!formik.touched.subMarket
                    ? formik.errors.subMarket
                    : null
                }
                dropdownItems={allSubMarkets
                  // ?.sort((a: any, b: any) => a.code.localeCompare(b.code))
                  .filter((x: any) => x.marketId === formik.values.market)
                  .map((i: any) => {
                    return { key: i.name, value: i.id };
                  })}
                name={"subMarket"}
                id={"subMarket"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Sub Market"}
                defaultValue={formik.values.subMarket}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={!!formik.errors.name && !!formik.touched.name}
                helperText={
                  !!formik.errors.name && !!formik.touched.name
                    ? formik.errors.name
                    : null
                }
                name={"name"}
                id={"name"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Property Name"}
                defaultValue={formik.values.name}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={!!formik.errors.address1 && !!formik.touched.address1}
                helperText={
                  !!formik.errors.address1 && !!formik.touched.address1
                    ? formik.errors.address1
                    : null
                }
                name={"address1"}
                id={"address1"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Street Address"}
                defaultValue={formik.values.address1}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={!!formik.errors.city && !!formik.touched.city}
                helperText={
                  !!formik.errors.city && !!formik.touched.city
                    ? formik.errors.city
                    : null
                }
                name={"city"}
                id={"city"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"City"}
                defaultValue={formik.values.city}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <DropdownCustomWithAGrid
                required={true}
                error={!!formik.errors.state && !!formik.touched.state}
                helperText={
                  !!formik.errors.state && !!formik.touched.state
                    ? formik.errors.state
                    : null
                }
                dropdownItems={states}
                name={"state"}
                id={"state"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"State"}
                defaultValue={formik.values.state}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <DropdownCustomWithAGrid
                required={true}
                error={!!formik.errors.county && !!formik.touched.county}
                helperText={
                  !!formik.errors.county && !!formik.touched.county
                    ? formik.errors.county
                    : null
                }
                dropdownItems={county}
                name={"county"}
                id={"county"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"County"}
                defaultValue={formik.values.county}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={!!formik.errors.zipCode && !!formik.touched.zipCode}
                helperText={
                  !!formik.errors.zipCode && !!formik.touched.zipCode
                    ? formik.errors.zipCode
                    : null
                }
                name={"zipCode"}
                id={"zipCode"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Zip Code"}
                defaultValue={formik.values.zipCode}
                type="number"
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={
                  !!formik.errors.totalBuildingSqFt &&
                  !!formik.touched.totalBuildingSqFt
                }
                helperText={
                  !!formik.errors.totalBuildingSqFt &&
                  !!formik.touched.totalBuildingSqFt
                    ? formik.errors.totalBuildingSqFt
                    : null
                }
                type={"number"}
                name={"totalBuildingSqFt"}
                id={"totalBuildingSqFt"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Total building Sq Ft"}
                defaultValue={formik.values.totalBuildingSqFt}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={!!formik.errors.ownership && !!formik.touched.ownership}
                helperText={
                  !!formik.errors.ownership && !!formik.touched.ownership
                    ? formik.errors.ownership
                    : null
                }
                name={"ownership"}
                id={"ownership"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Ownership"}
                defaultValue={formik.values.ownership}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={
                  !!formik.errors.clearHeight && !!formik.touched.clearHeight
                }
                helperText={
                  !!formik.errors.clearHeight && !!formik.touched.clearHeight
                    ? formik.errors.clearHeight
                    : null
                }
                type={"number"}
                name={"clearHeight"}
                id={"clearHeight"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Clear Height"}
                defaultValue={formik.values.clearHeight}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <YearSelectorWithCustomGrids
                limit={10}
                required={true}
                error={!!formik.errors.yearBuilt && !!formik.touched.yearBuilt}
                helperText={
                  !!formik.errors.state && !!formik.touched.yearBuilt
                    ? formik.errors.yearBuilt
                    : null
                }
                name={"yearBuilt"}
                id={"yearBuilt"}
                value={formik.values.yearBuilt}
                label={"Year Built"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ReadonlyLabelField
                required={true}
                error={
                  !!formik.errors.siteCoverage && !!formik.touched.siteCoverage
                }
                helperText={
                  !!formik.errors.siteCoverage && !!formik.touched.siteCoverage
                    ? formik.errors.siteCoverage
                    : null
                }
                type={"number"}
                name={"siteCoverage"}
                id={"siteCoverage"}
                gridProps={HALF_WIDTH_GRID_PROPS}
                label={"Site Coverage"}
                defaultValue={formik.values.siteCoverage}
                readOnly={false}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ButtonWithAGrid1
                variant="contained"
                size="large"
                id={"save"}
                label={"Save"}
                handleClick={formik.handleSubmit}
                gridProps={FORTH_WIDTH_GRID_PROPS}
              />
              {/* </form> */}
            </Grid>
          </Paper>
        </Container>
        <CustomizedSnackbars
          open={successSnackOpen}
          autoHideDuration={3000}
          severity={"success"}
          message="Property Added Successfully."
        />
        <CustomizedSnackbars
          open={errorSnackOpen}
          autoHideDuration={3000}
          severity={"error"}
          message="Somethig went wrong."
        />
      </Box>
    </LLCustomizedDialogs>
  );
}
