import React, { useState } from 'react';

const SingleItem = (props) => {
  const { name } = props;
  return (
    <div>
      <label htmlFor={name}>
        <input type="checkbox" id={name} />
        {name}
      </label>
    </div>
  );
};
