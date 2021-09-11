import { useRef } from 'react';
import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';

const Header = () => {
  const token = localStorage.getItem('token');
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = () => setIsActive(!isActive);

  return (
    <div style={{ width: '100%', marginTop: '2em' }}>
      <Box display="flex" alignItems="center" justifyContent="center" p={2}>
        <img
          src="https://image.flaticon.com/icons/png/512/1000/1000145.png"
          alt="lettuce icon"
          height="70"
        />
        <Typography variant="h1">Lettuce Know</Typography>
      </Box>
      <div className="menu-container">
        <Typography variant="h3" onClick={onClick} className="menu-trigger">
          <Typography variant="h4">
            Would you like to invite your friends?
          </Typography>
        </Typography>
        <div
          ref={dropdownRef}
          className={`menu ${isActive ? 'active' : 'inactive'}`}
        >
          <Typography variant="subtitle2">Your token is: {token}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Header;
