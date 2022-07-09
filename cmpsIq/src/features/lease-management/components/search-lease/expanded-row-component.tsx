import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import {Container, Grid, Paper, Stack, Tooltip} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {MapComponent} from '@features/lease-management';

export const HALF_WIDTH_GRID_PROPS = {xs: 2, sm: 4, md: 6, xl: 8};
export const FORTH_WIDTH_GRID_PROPS = {xs: 1, sm: 2, md: 3, xl: 4};
type DetailRowProps = {label: string; text: string};
const DetailRow = ({label, text}: DetailRowProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={0}>
      <Typography variant="body1" color="text.secondary">
        {label}:&nbsp;
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Stack>
  );
};

const ExpandedRow = (props: any) => {
  const {data} = props;
  if (!data) {
    return null;
  }
  console.log('data', data);
  return (
    <Box sx={{py: 2, px: 4}}>
      <Container maxWidth="xl" disableGutters>
        <Paper sx={{mb: 3, p: 3}}>
          <Grid
            container
            direction="row"
            pt={0}
            margin={0}
            minHeight="300px"
            spacing={{xs: 1, md: 2}}
            columns={{xs: 4, sm: 8, md: 12, xl: 16}}
          >
            <Grid item {...FORTH_WIDTH_GRID_PROPS}>
              <Stack direction="column" gap={1}>
                <Typography variant="h6">Lease Details:</Typography>
                {data.leaseTypeName && <DetailRow label="Type" text={data.leaseTypeName} />}
                {data.leaseCommencementDate && (
                  <DetailRow
                    label="Commencement Date"
                    text={data.leaseCommencementDate.substring(0, 10)}
                  />
                )}
                {data.leaseExecutionDate && (
                  <DetailRow
                    label="Execution Date"
                    text={data.leaseExecutionDate.substring(0, 10)}
                  />
                )}
                {data.leaseGeneration && (
                  <DetailRow label="Generation" text={data.leaseGeneration} />
                )}

                {data.leaseSqFt && <DetailRow label="Sqft" text={data.leaseSqFt} />}
              </Stack>
            </Grid>
            <Grid item {...FORTH_WIDTH_GRID_PROPS}>
              <Box>
                {!!data.tenant && <Typography variant="h6">{data.tenant}</Typography>}
                {!!data.name && <Typography variant="body1">{data.name}</Typography>}
                <Typography variant="body1" color="text.secondary">
                  {data.address1}
                  <br />
                  {!!data.address2 && `${data.address2}<br/>`}
                  {data.city}, {data.state} {data.zipCode}
                </Typography>
                <Stack direction="row" gap={3} alignItems="center">
                  <Tooltip title="Market" arrow>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <div>
                        <LocationCityIcon />
                      </div>
                      <div>
                        <Typography variant="body1" color="text.secondary">
                          {data.market}
                        </Typography>
                      </div>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="SubMarket" arrow>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <div>
                        <MapsHomeWorkIcon />
                      </div>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          {data.subMarket}
                        </Typography>
                      </div>
                    </Stack>
                  </Tooltip>
                </Stack>
              </Box>
            </Grid>

            <Grid item {...HALF_WIDTH_GRID_PROPS}>
              <Stack direction="column" gap={1} sx={{height: '100%'}}>
                <Typography variant="h6">Location Map:</Typography>
                <MapComponent />
              </Stack>
            </Grid>
          </Grid>
          {!!data.note && (
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{}}>
                Notes:
              </Typography>
              <Typography variant="body1" sx={{}}>
                {data.note}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export  {ExpandedRow};
