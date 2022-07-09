import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import {ExpandedRow} from '@features/lease-management';
// import SearchExpandable from '../../lease-management/search/SearchExpandable';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
const SearchTableRow=(props: any)=> {
    const [row, setRow] = React.useState(props.row);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    useEffect(() => {
      const _row = props.row;
  
      // _row.cells=_row.cells.slice(0,_row.cells.length-2)
      setRow(_row);
    }, [props]);
    return (
      <React.Fragment >
        <TableRow className={classes.root} key={props.index}>
          {/* <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> */}
  
          {row.cells.map((cell: any, key: number) => {
            return (
              <TableCell key={key} {...cell.getCellProps()} style={{fontSize:"10px"}}>
                {cell.render('Cell')}
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow>
          <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={11}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={0}>
                  {/* <ExpandedRow data={row.original} /> */}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  export  {SearchTableRow}