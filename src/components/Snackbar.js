import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarContext } from '../contexts/SnackbarContext';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function SimpleSnackbar(prop) {
  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);
  const { visible, message, setVisible } = useContext(SnackbarContext);

  /*const handleClick = () => {
    setOpen(true);
  };*/

  const handleClose = (event, reason) => {
    /*if (reason === "clickaway") {
      return;
    }*/

    setVisible(false);
    console.log('cerrando snackbar');
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={visible}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}
