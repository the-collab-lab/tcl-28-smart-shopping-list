import React, { useEffect, useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../lib/firebase';
import { Button } from '@material-ui/core';
import Input from './Input';

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
    <div>
      <h1>Welcome to Your Smart Shopping list!</h1>
      <Button onClick={createToken} variant="contained" color="primary">
        Create a new list
      </Button>
      <p>-or-</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={verifyToken}>
        <Input
          name="token"
          label="Enter token here"
          value={sharedToken}
          onChange={(e) => setSharedToken(e.target.value)}
        />
        {sharedTokenError && <p>Token is not found. Please try again.</p>}
        <Button type="submit" variant="contained" color="primary">
          Join an existing list
        </Button>
      </form>
    </div>
  );
};

export default Home;
