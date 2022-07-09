import { GenericDataTable } from '@features/ui-components';
import { Box, Button } from '@mui/material';
// import {useSnackbar} from 'notistack';
import React from 'react';
import {CardView} from '@features/lease-management';

import { downloadCSV } from './SearchLeaseFunctions';
import {SearchTableRow} from '@features/lease-management';

// const Export = (props: any) => (
//   <Button onClick={(e: any) => props.onExport(e.target.value)}>Export</Button>
// );
const LeaseList = (props: any) => {
  return (
    <>
      {/* <Box sx={{mb: 1, textAlign: 'end'}}>
        <Export onExport={() => downloadCSV(props.data)} />
      </Box> */}
      {props.isBigScreen ? (
        <GenericDataTable
          columns={props.columns}
          data={props.data}
          totalRows={props.totalRows}
          hasMore={props.hasMore}
          handleScroll={props.handleInfiniteScroll}
          tableRowComponent={SearchTableRow}
        />
      ) : (
        <CardView data={props.data} handleScroll={props.handleInfiniteScroll} totalRows={props.totalRows} />
      )}
    </>
  );
};



export  {LeaseList};
