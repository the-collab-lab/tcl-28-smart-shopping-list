import React, { useEffect, useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { firestore } from '../lib/firebase';

const Home = () => {
  const history = useHistory();
  const [sharedToken, setSharedToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/list');
  });

  const createToken = async (sharedToken) => {
    const token = sharedToken || getToken();
    localStorage.setItem('token', token);
    await firestore.collection('tokens').doc(token).set({});
    history.push('/list');
  };

  return (
    <div>
      <h1>Welcome to Your Smart Shopping list!</h1>
      <button onClick={() => createToken()}>Create a new list</button>
      <p>-or-</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={() => createToken(sharedToken)}>
        <label htmlFor="token">Share token</label>
        <input
          type="text"
          name="token"
          value={sharedToken}
          onChange={(e) => setSharedToken(e.target.value)}
        />
        <button type="submit"> Join an existing list</button>
      </form>
    </div>
  );
};

export default Home;
