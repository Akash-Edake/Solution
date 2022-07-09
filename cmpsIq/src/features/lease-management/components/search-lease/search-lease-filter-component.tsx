import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Button,
  Collapse,
  InputAdornment,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { downloadCSV } from './SearchLeaseFunctions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {getDateThreeMonthsFromNow} from '../shared/func/Functions';
import {LLMobileDatePicker,LLCheckBox,LLSelectBox,LLTextFieldAlphaNumeric} from '@features/ui-components';
import {useState} from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GRID_PROPS = {xs: 6, sm: 4, md: 3, xl: 4};
const SearchLeaseFilters = (props: any) => {
  const [selectedmarketId, setSelectedmarketId] = useState('');
  const [selectedsubMarketId, setSelectedsubMarketId] = useState('');
  const [minLeaseSqft, setMinLeaseSqft] = useState('');
  const [maxLeaseSqft, setMaxLeaseSqft] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  // const [executionStartDate, setExecutionStartDate] = useState(getDateThreeMonthsFromNow());
  // const [executionEndDate, setExecutionEndDate] = useState(new Date('2099-12-31T23:59:59'));
  const [executionStartDate, setExecutionStartDate] = useState(null);
  const [executionEndDate, setExecutionEndDate] = useState(null);
  const [isMyCompsOnly, setIsMyCompsOnly] = useState(false);
  const [hideFilters, setHideFilters] = useState(true);

  // const authCon = useAuthContext();

  const handleMarketChange = (event: SelectChangeEvent) => {
    debugger
    setSelectedmarketId(event.target.value as string);
  };

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSelectedSource(event.target.value as string);
  };

  const handleSubMarketChange = (event: SelectChangeEvent) => {
    debugger
    setSelectedsubMarketId(event.target.value as string);
  };

  const onChangeMaxLeaseSqFt = (event: SelectChangeEvent) => {
    setMaxLeaseSqft(event.target.value as string);
  };

  const onChangeMinLeaseSqFt = (event: SelectChangeEvent) => {
    setMinLeaseSqft(event.target.value as string);
  };
  const onChangeServerText = (event: any) => {
    setSearchText(event.target.value as string);
  };

  const onExecutionEndDateChange = (newVal: any) => {
    setExecutionEndDate(newVal);
  };

  const onExecutionStartDateChange = (newVal: any) => {
    setExecutionStartDate(newVal);
  };

  const onSearch = (e: any) => {
    console.log(
      selectedmarketId,
      selectedsubMarketId,
      minLeaseSqft,
      maxLeaseSqft,
      searchText,
      executionStartDate,
      executionEndDate,
      isMyCompsOnly
    );

    props?.onSearch(
      selectedmarketId,
      selectedsubMarketId,
      minLeaseSqft,
      maxLeaseSqft,
      searchText,
      executionStartDate,
      executionEndDate,
      selectedSource,
      isMyCompsOnly
    );
  };
  const onClear = (e: any) => {
    setSelectedmarketId('');
    setSelectedsubMarketId('');
    setMaxLeaseSqft('');
    setMinLeaseSqft('');
    setSearchText('');
    // setExecutionStartDate(getDateThreeMonthsFromNow());
    setExecutionStartDate(null);
    setIsMyCompsOnly(false);
    setSelectedSource('');
    props.onClear();
  };
  const handleOnSearchClear = () => {
    setSearchText('');
  };
  const onHideFilters = (e: any) => {
    setHideFilters(!hideFilters);
  };

  const onEnter = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      props?.onSearch(
        selectedmarketId,
        selectedsubMarketId,
        minLeaseSqft,
        maxLeaseSqft,
        searchText,
        executionStartDate,
        executionEndDate,
        selectedSource,
        isMyCompsOnly
      );
    }
  };
  const Export = (props: any) => (
    <Button onClick={(e: any) => props.onExport(e.target.value)}>Export</Button>
  );
  return (
    <Container maxWidth="xl" disableGutters>
      <Paper sx={{mb: props.isBigScreen ? 3 : 1, p: 2}}>
        <Stack
          direction="row"
          alignItems={'center'}
          spacing={{xs: 1, sm: 1, md: 3, lg: 3, xl: 3}}
          component="div"
          gap={0}
        >
          <Box flex="1">
            <TextField
              type="text"
              autoFocus
              fullWidth
              variant="outlined"
              value={searchText}
              label="Search Leases"
              onChange={onChangeServerText}
              InputProps={{
                endAdornment: searchText && (
                  <InputAdornment position="end">
                    <IconButton aria-label="Clear Search" onClick={handleOnSearchClear} edge="end">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyUp={onEnter}
            />
          </Box>
          <Box>
            <Button type="button" onClick={onSearch} variant="contained" sx={{mr: 2}}>
              Search
            </Button>
            <Button type="button" onClick={onClear} >
              clear
            </Button>
           
        <Export onExport={() => downloadCSV(props.data)} />
      
          </Box>
          <Box>
            <Tooltip title={`${!hideFilters ? 'Hide ' : 'Show '} Filters`} arrow>
              <div>
                <ExpandMore
                  expand={!hideFilters}
                  onClick={onHideFilters}
                  aria-expanded={!hideFilters}
                  aria-label="Show Advanced Filters"
                >
                  <TuneIcon />
                </ExpandMore>
              </div>
            </Tooltip>
            {/* {!hideFilters ? <FilterListOffIcon  onClick={onHideFilters}/>:<FilterListIcon  onClick={onHideFilters}/>} */}
          </Box>
        </Stack>

        <Collapse in={!hideFilters}>
          <Grid
            container
            direction="row"
            pt={4}
            margin={0}
            spacing={{xs: 2, md: 3}}
            columns={{xs: 4, sm: 8, md: 12, xl: 16}}
          >
            <Grid item {...GRID_PROPS}>
              <LLSelectBox
                dropdownItems={props.markets
                  // ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                  .map((x: any, i: any) => {
                    return {value: x.value, key: x.key};
                  })}
                handleChange={handleMarketChange}
                label={'Market'}
                ahelperText={'Select the market to search'}
                name="market"
                value={selectedmarketId}
              />
            </Grid>
            <Grid item {...GRID_PROPS}>
              <LLTextFieldAlphaNumeric
                id="minLeaseSqFt"
                label="Lease Sq Ft Min"
                variant="outlined"
                name={'minLeaseSqFt'}
                value={minLeaseSqft}
                onChange={onChangeMinLeaseSqFt}
              />
            </Grid>
            <Grid item {...GRID_PROPS}>
              <LLMobileDatePicker
                label={'Execution Start Date'}
                value={executionStartDate}
                onChange={onExecutionStartDateChange}
              />
            </Grid>

            <Grid item {...GRID_PROPS}>
              <LLSelectBox
                //x.leaseSourceTypeId
                fullWidth
                label={'Source'}
                dropdownItems={props.leaseSourceTypes?.map((x: any, i: any) => {
                  return {value: x.id, key: x.name};
                })}
                ahelperText={''}
                name={'source'}
                handleChange={handleSourceChange}
                value={selectedSource}
              />
            </Grid>
            <Grid item {...GRID_PROPS}>
              <LLSelectBox
                fullWidth
                label={'SubMarket'}
                dropdownItems={props.subMarkets
                  // ?.sort((a: any, b: any) => a.code.localeCompare(b.code))
                  .filter((x: any) => x.marketId === selectedmarketId)
                  .map((x: any, i: any) => {
                    return {value: x.value, key: x.key};
                  })}
                ahelperText={''}
                name={'submarket'}
                handleChange={handleSubMarketChange}
                value={selectedsubMarketId}
              />
            </Grid>
            <Grid item {...GRID_PROPS}>
              <LLTextFieldAlphaNumeric
                id="maxLeaseSqFt"
                label="lease sq ft max"
                variant="outlined"
                name={'maxLeaseSqFt'}
                value={maxLeaseSqft}
                onChange={onChangeMaxLeaseSqFt}
              />
            </Grid>
            <Grid item {...GRID_PROPS}>
              <LLMobileDatePicker
                label={'Execution End Date'}
                value={executionEndDate}
                onChange={onExecutionEndDateChange}
              />
            </Grid>
            <Grid item {...GRID_PROPS}>
              <LLCheckBox
                checked={isMyCompsOnly}
                onChange={() => {
                  setIsMyCompsOnly(!isMyCompsOnly);
                }}
                label="Show My Comps Only"
              />
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
    </Container>
  );
};

export  {SearchLeaseFilters};
