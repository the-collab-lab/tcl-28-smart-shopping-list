import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { CardMedia } from '@material-ui/core';

const Header = () => {
  const token = localStorage.getItem('token');
  return (
    <>
      <div style={{ width: '100%', marginTop: '2em' }}>
        <Box display="flex" alignItems="center" justifyContent="center" p={1}>
          <img
            src="https://image.flaticon.com/icons/png/512/1000/1000145.png"
            alt="logo"
            height="70"
          />
          <Typography variant="h2">Lettuce Know</Typography>
        </Box>
        <Typography variant="h5" component="p">
          Your token is: {token}
        </Typography>
      </div>
    </>
  );
};

export default Header;
