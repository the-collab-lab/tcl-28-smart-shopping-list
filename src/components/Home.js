import React, { useEffect, useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../lib/firebase';
import GreenButton from './GreenButton';

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
      <GreenButton createToken={createToken} btnText="Create a new list" />
      <p>-or-</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={verifyToken}>
        <label htmlFor="token">Share token</label>
        <input
          type="text"
          id="token"
          name="token"
          value={sharedToken}
          onChange={(e) => setSharedToken(e.target.value)}
        />
        {sharedTokenError && <p>Token is not found. Please try again.</p>}
        <GreenButton type="submit" btnText="Join an existing list" />
      </form>
    </div>
  );
};

export default Home;
