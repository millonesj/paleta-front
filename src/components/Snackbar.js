import React, { useContext, useEffect, useState } from 'react';
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
  const [visible, setVisible] = useState(false);
  const { snackMessage, setSnackMessage } = useContext(SnackbarContext);

  useEffect(() => {
    console.log(snackMessage);
    if (snackMessage !== '') {
      setVisible(true);
    }
  }, [snackMessage]);

  const handleClose = (event, reason) => {
    setVisible(false);
    setSnackMessage('');
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={visible}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackMessage}</span>}
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
