import LocationOnIcon from "@mui/icons-material/LocationOn";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import throttle from "lodash/throttle";
import * as React from "react";
import SimpleReactValidator from "simple-react-validator";
import { THIRD_WIDTH_GRID_PROPS ,LLAutoComplete} from "@features/ui-components";
// const url = `https://acs-lnk-compsapp-ncus-uat-01.search.windows.net/indexes/azi-lnk-rpu-ncus-uat-01/docs/search?api-version=2020-06-30-preview`;
const url = `https://compsiq-dv-ncus-app02.azurewebsites.net/property/autocomplete`;
const data = {
  select: "STREET_ADDRESS,CITY,PROPERTY_NAME,STATE,ZIP,LATITUDE,LONGITUDE",
  top: 50,
  count: true,
  skip: 0,
};
type Property = {
  address: string;
  city: string;
  property_name: string;
  state: string;
  zip: string;
  county: string;
  // latitude: number;
  // longitude: number;
  clearHeight:string,
  market:string,
  ownership:string,
  propertyId:string,
  siteCoverage:string,
  subMarket:string,
  subMarketId:string,
  marketId:string,
  totalBuildingSqFt:string,
  yearBuilt:string,
};
const headers = {
  "Content-Type": "application/json",
  "api-key": `5366A78BCA896EAA1F6F9E9114D05864` || "",
};
const PropertyAutoComplete = (props: any) => {
  const [value, setValue] = React.useState<Property | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly Property[]>([]);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const validator = React.useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
      element: (message: any) => {
        return message;
      },
    })
  );
  const valueError = validator.current.message("property", value, "required");

  const search = React.useMemo(
    () =>
      throttle(
        (input: string, callback: (results?: readonly Property[]) => void) => {
          fetch(url+"/"+input, {
            body: JSON.stringify({ ...data, search: input }),
            method: "POST",
            headers,
            mode: "cors",
          })
            .then((response) => response.json())
            .then((data) => {
              debugger
              // console.log(data);
              // callback(
              //   (data.value as any[]).map((x) => ({
              //     address: x.STREET_ADDRESS,
              //     city: x.CITY,
              //     property_name: x.PROPERTY_NAME,
              //     state: x.STATE,
              //     zip: x.ZIP,
              //     latitude: x.LATITUDE,
              //     longitude: x.LONGITUDE,
              //   })) as Property[]
              // );
              callback(
                (data as any[]).map((x) => ({
                  address: x.address1+","+x.address2,
                  city: x.city,
                  property_name: x.name,
                  state: x.state,
                  zip: x.zipCode,
                  // latitude: x.LATITUDE,
                  // longitude: x.LONGITUDE,
                  clearHeight:x.clearHeight,
                  market:x.market!=null?x.market:"-",
                  ownership:x.ownership,
                  propertyId:x.propertyId,
                  siteCoverage:x.siteCoverage,
                  subMarket:x.subMarket!=null?x.subMarket:"-",
                  subMarketId:x.subMarketId,
                  marketId:"",
                  totalBuildingSqFt:x.totalBuildingSqFt,
                  yearBuilt:x.yearBuilt,

                })) as Property[]
              );
            });
        },
        200
      ),
    []
  );
  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    search(inputValue, (results?: readonly Property[]) => {
      if (active) {
        let newOptions: readonly Property[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue]);
// }, [value, inputValue, fetch]);
  return (
    <Grid item {...(props?.gridProps ?? { ...THIRD_WIDTH_GRID_PROPS })}>
      <LLAutoComplete
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event: any, newValue: Property | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          props.setPropertyDetails(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            helperText={valueError}
            {...params}
            error={!!valueError}
            required
            label="Choose a Property"
            autoFocus
            fullWidth
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} style={{ display: "block" }}>
              <div>
                <Grid container alignItems="center">
                  <Grid item>
                    <Box
                      component={LocationOnIcon}
                      sx={{ color: "text.secondary", mr: 2 }}
                    />
                  </Grid>
                  <Grid item xs>
                    {option.property_name && (
                      <Typography variant="body1" color="text.secondary">
                        {option.property_name}
                      </Typography>
                    )}
                    <div>
                      <Typography variant="body1" color="text.secondary">
                        {option.address}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2">
                        {option.city}, {option.state} {option.zip}
                      </Typography>
                      <Typography variant="body2">
                        {`Owner : ${option.ownership}`}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </li>
          );
        }}
        onBlur={() => validator.current.showMessageFor("property")}
        sx={{ width: "auto" }}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.address} ${option.city}, ${option.state} ${option.zip} | ${option.ownership}`.trim()
        }
        filterOptions={(x) => x}
      />
    </Grid>
  );
};

export default PropertyAutoComplete;
