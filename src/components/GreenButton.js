import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/Button.css';

const GreenButton = (props) => {
  const { btnText, createToken } = props;

  return (
    <Button
      className="green-btn"
      variant="contained"
      color="primary"
      onClick={createToken}
    >
      {btnText}
    </Button>
  );
};

export default GreenButton;
