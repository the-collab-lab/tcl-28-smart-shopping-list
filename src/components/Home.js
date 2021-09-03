import React, { useEffect, useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../lib/firebase';
import Input from './Input';
import GreenButton from './GreenButton';
import { Box, Typography } from '@material-ui/core';

const Home = () => {
  const history = useHistory();
  const [sharedToken, setSharedToken] = useState('');
  const [sharedTokenError, setSharedTokenError] = useState('');
  const tokensRef = firestore.collection('tokens');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/list');
  });

  const verifyToken = (e) => {
    e.preventDefault();
    tokensRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === sharedToken) {
            localStorage.setItem('token', sharedToken);
            history.push('/list');
          } else {
            setSharedTokenError('Invalid token');
          }
        });
      })
      .catch((err) => console.log('Error message: ', err));
  };

  const createToken = async () => {
    const token = getToken();
    localStorage.setItem('token', token);
    await firestore.collection('tokens').doc(token).set({});
    history.push('/list');
  };

  return (
    <>
      <div style={{ width: '100%', marginTop: '3em' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2">LETTUCE KNOW</Typography>
          <img
            src="https://image.flaticon.com/icons/png/512/1000/1000145.png"
            alt="lettuce icon"
            height="120"
          />

          <GreenButton
            clickFunction={createToken}
            btnText="Create a new list"
          />
          <Typography variant="subtitle2">-or-</Typography>
          <Typography variant="h6">
            Join an existing shopping list by entering a three word token.
          </Typography>
          <Box display="flex" flexDirection="column">
            <form onSubmit={verifyToken}>
              <Input
                required
                name="token"
                placeholder="Enter a token"
                value={sharedToken}
                onChange={(e) => setSharedToken(e.target.value)}
              />
              {sharedTokenError && (
                <Typography variant="subtitle1">
                  Token is not found. Please try again.
                </Typography>
              )}
              <Box flexGrow={1}>
                <GreenButton
                  type="submit"
                  clickFunction={verifyToken}
                  btnText="Join an existing list"
                />
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;
