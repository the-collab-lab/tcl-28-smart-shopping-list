import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
}));

const Input = (props) => {
  const { label, name, value, onChange } = props;
  const classes = useStyles();
  return (
    <TextField
      required
      name={name}
      value={value}
      id="outlined-basic"
      variant="outlined"
      size="small"
      label={label}
      className={classes.textField}
      onChange={onChange}
    />
  );
};

export default Input;
