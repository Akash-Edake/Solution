import ClearIcon from '@mui/icons-material/Clear';
import {Box, Button, InputAdornment, SelectChangeEvent, Stack, TextField} from '@mui/material';
import Container from '@mui/material/Container';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
// import {useAuthContext} from 'common/context/AuthContext';
import {getDateThreeMonthsFromNow} from '../shared/func/Functions';
import {useState} from 'react';
import {SearchLeaseFilters} from '@features/lease-management';
import SwipeableEdgeDrawer from './SwipableDrawer';
import SearchIcon from '@mui/icons-material/Search';

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
const MobileScreenSearchFilters = (props: any) => {
  const [selectedmarketId, setSelectedmarketId] = useState('');
  const [selectedsubMarketId, setSelectedsubMarketId] = useState('');
  const [minLeaseSqft, setMinLeaseSqft] = useState('');
  const [maxLeaseSqft, setMaxLeaseSqft] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  const [executionStartDate, setExecutionStartDate] = useState(getDateThreeMonthsFromNow());
  const [executionEndDate, setExecutionEndDate] = useState(new Date('2099-12-31T23:59:59'));
  const [isMyCompsOnly, setIsMyCompsOnly] = useState(false);
  const [hideFilters, setHideFilters] = useState(true);

  // const authCon = useAuthContext();
  // console.log(authCon?.state?.user?.username);

  const handleMarketChange = (event: SelectChangeEvent) => {
    setSelectedmarketId(event.target.value as string);
  };

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSelectedSource(event.target.value as string);
  };

  const handleSubMarketChange = (event: SelectChangeEvent) => {
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
    setExecutionStartDate(getDateThreeMonthsFromNow());
    setIsMyCompsOnly(false);
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

  return (
    <Container maxWidth="xl" disableGutters>
      <Paper sx={{mb: props.isBigScreen ? 3 : 1, p: 3}}>
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
          <IconButton aria-label="search" onClick={onSearch} >
        <SearchIcon />
      </IconButton>
            {/* <Button type="button" onClick={onSearch} variant="contained" sx={{mr: 2}}>
              Search
            </Button> */}
            <Button type="button" onClick={onClear} disabled={!searchText}>
              clear
            </Button>
          </Box>
          <Box>
            <SwipeableEdgeDrawer>
              <SearchLeaseFilters
                markets={props.markets}
                subMarkets={props.subMarkets}
                leaseSourceTypes={props.leaseSourceTypes}
                onSearch={props.onSearch}
                onClear={props.onClear}
                isBigScreen={props.isBigScreen}
              />
            </SwipeableEdgeDrawer>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export  {MobileScreenSearchFilters};
