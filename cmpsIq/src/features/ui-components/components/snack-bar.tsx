import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { PropaneSharp } from '@mui/icons-material';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  function CustomizedSnackbars(props:any) {
  const [open, setOpen] = React.useState(props.open);
React.useEffect(()=>{
  setOpen(props.open);
  setTimeout(() => {
    setOpen(false)
  }, props.autoHideDuration);
},[props.open]);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    
     <Snackbar open={open} autoHideDuration={props.autoHideDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
     
   
  );
}
