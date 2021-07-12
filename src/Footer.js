import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <NavLink to="/add" activeClassName="active-link">
        Add An Item
      </NavLink>
      <NavLink to="/list" activeClassName="active-link">
        View Your List
      </NavLink>
    </div>
  );
};

export default Footer;
