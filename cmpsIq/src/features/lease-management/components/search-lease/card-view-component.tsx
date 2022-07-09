import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditLease from './actions/EditLease';
// import FullScreenDialog from 'components/shared/ui-elements/FullScreenDialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ViewLease from './actions/ViewLease';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';
import { Margin } from '@mui/icons-material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button, Paper } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LLFullScreenDialog } from '@features/ui-components';
import { AddLease } from '../add-lease/add-lease-component';
import { EditCompstackLease } from '../add-lease/edit-compstack-lease-component';

export  function CardView(props: any) {
  const [loadedPage,setLoadedPage]=useState(1);
  const FetchMoreData=()=>{
    
    setLoadedPage(loadedPage+1)
    props.handleScroll(loadedPage+1)
  }
  const style = {
    height: 300,
    // border: "1p solid green",
    margin:10,
    marginBottom: 30,
    // padding: 8,
    width:420
  };
  return (
    <>
        <Grid container spacing={2} key={1}>
    
        <Grid item xs={12}   >
        
            <Box
              sx={{
                p: 1,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr ' },
                gap: 2,
              }}
            >
                 
      <InfiniteScroll
            dataLength={props.data.length}
            next={FetchMoreData}
            hasMore={props.data.length < props.totalRows}
            loader={ <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>}
            scrollableTarget="scrollableDiv"

          >
              {props.data.map((row,index) => (
                <div key={index}>
               <Card sx={{ minWidth: 275 }}  elevation={3} >
               <CardContent>
               <Grid container spacing={1}>
  <Grid item xs={6}>
  <Typography variant="caption" display="block" gutterBottom  ><ApartmentIcon/> {row.market}</Typography>
  </Grid>
  <Grid item xs={6}>
  <Typography variant="caption" display="block" gutterBottom  ><HomeWorkIcon/> {row.subMarket}</Typography>
  </Grid>
  <Grid item xs={6}>
  <Typography variant="caption" display="block" gutterBottom  ><PersonIcon/> {row.tenant}</Typography>
  </Grid>
  <Grid item xs={6}>
  <Typography variant="caption" display="block" gutterBottom  ><SquareFootIcon/> {`${row.leaseSqFt} sqft`}</Typography>
  </Grid>
  <Grid item xs={6}>
  <Typography variant="caption" display="block" gutterBottom  ><AttachMoneyIcon/> {`${row.rentPerSqFt} / sqft`}</Typography>
  </Grid>
</Grid>
               </CardContent>
               <CardActions>
               <LLFullScreenDialog actions={<PreviewIcon/>} title="View Lease">
                    <AddLease varient="EDIT" id={row.leaseId}/>
                  </LLFullScreenDialog>
                  <LLFullScreenDialog actions={<EditIcon/>} title="Edit Lease">
                  {row.compStakLeaseId!=undefined?
            <EditCompstackLease varient={"EDIT"} id={row.compStakLeaseId}/>:
              <AddLease varient={"EDIT"} id={row.leaseId}/>}         
                    </LLFullScreenDialog>
              
               </CardActions>
             </Card>
             <br/></div>
              ))}
              </InfiniteScroll>
     
            </Box>
          
        </Grid>
     
    </Grid>
    
    </>
  );
}
