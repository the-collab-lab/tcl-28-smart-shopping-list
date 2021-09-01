import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
}));

const Input = () => {
  const classes = useStyles();
  return (
    <TextField
      required
      id="outlined-basic"
      variant="outlined"
      size="small"
      className={classes.textField}
    />
  );
};

export default Input;
