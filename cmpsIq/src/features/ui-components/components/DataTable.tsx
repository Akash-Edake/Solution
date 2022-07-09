import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSortBy, useTable } from 'react-table';
import PropTypes from "prop-types";

const DataTable = (props: {columns: any; data: any; totalRows: string;hasMore:boolean; handleScoll: () => void; tableRowComponent:any}) => {
  const tableData = {columns: props.columns, data: props.data};
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
    {
      ...tableData,
    },
    useSortBy
  );

  
  
  const {tableRowComponent: DataTableRow} = props;
  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={props.handleScoll}
      hasMore={props.data.length < props.totalRows}
      loader={
        <Box sx={{width: '100%', marginBottom: '10px'}}>
          <LinearProgress />
        </Box>
      }
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b></b>
        </p>
      }
      scrollableTarget="scrollableDiv"
    >
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: any, key: number) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {/* <TableCell  style={{ width: "50px"}}>
                <></>
              </TableCell> */}
              {headerGroup.headers.map((column: any, colKey: number) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <>
                  {!column.sortable ? (
                    <TableCell
                      key={key}
                      {...column.getHeaderProps()}
                      style={{fontSize: '12px', fontWeight: 'bold', width: "50px"}}
                    >
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                    </TableCell>
                  ) : (
                    <TableCell
                      key={key}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{fontSize: '12px', fontWeight: 'bold', width: column.width}}
                    >
                      <u> {column.render('Header')}</u>
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowUpwardIcon />
                          ) : (
                            <ArrowDownwardIcon />
                          )
                        ) : null}
                      </span>
                    </TableCell>
                  )}
                </>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()} >
          {/* <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}> */}
          {rows.map((row: any,index:number) => {
            prepareRow(row);
            return (
            
                <DataTableRow row={row} index={index} />
            
            );
          })}
          {/* </div> */}
        </TableBody>
      </MaUTable>
    </InfiniteScroll>
  );
 

};
DataTable.propTypes = {
  tableRowComponent: PropTypes.func.isRequired,
};
interface Icolumn {
  Header: any;
  accessor: any;
  Cell?: any;
  sortable: any;
  width: any;
}



function GenericDataTable(props: any) {
  const columns: any[] = props.columns.map((col: any) => {
    const column: Icolumn = {
      Header: col.name,
      accessor: col.id,
      sortable: col.sortable,
      width: col.width,
    };
    if (col.cell) {
      column.Cell = col.cell;
    }
    return column;
  });
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const [data, setData] = useState(React.useMemo(() => props.data, []));
  const [scrollCount, setScrollCount] = useState(1);
  // let data = React.useMemo(() => makeData(20), [])
  const handleScoll = () => {
    const _scrollCount = scrollCount + 1;
    setScrollCount(_scrollCount);
    props.handleScroll(_scrollCount);
    //   setTimeout(()=>{setData(data.concat(data))},1500)
  };
  console.log("columns",columns)
  return (
    <div>
      <DataTable columns={columns} data={data} handleScoll={handleScoll} totalRows={props.totalRows} hasMore={props.hasMore} tableRowComponent={props.tableRowComponent}/>
    </div>
  );
}

export { GenericDataTable };

