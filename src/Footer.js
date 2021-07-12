import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <Link to="/add">Add An Item</Link>
      <Link to="/list">View Your List</Link>
    </div>
  );
};

export default Footer;
