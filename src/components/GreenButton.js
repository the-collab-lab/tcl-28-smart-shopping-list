import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/GreenButton.css';

const GreenButton = (props) => {
  const { btnText, clickFunction } = props;

  return (
    <Button
      className="green-btn"
      variant="contained"
      color="primary"
      onClick={clickFunction}
    >
      {btnText}
    </Button>
  );
};

export default GreenButton;
