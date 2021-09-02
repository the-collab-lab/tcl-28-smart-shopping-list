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
  const { placeholder, name, value, onChange, required } = props;
  const classes = useStyles();
  return (
    <TextField
      required={required}
      name={name}
      value={value}
      variant="outlined"
      size="small"
      placeholder={placeholder}
      className={classes.textField}
      onChange={onChange}
    />
  );
};

export default Input;
