import React, { useEffect } from 'react';
import getToken from './lib/tokens';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) history.push('/list');
  });

  const createToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list');
  };

  return (
    <div>
      <h1>Welcome to Your Smart Shopping list!</h1>
      <button onClick={createToken}>Create a new list</button>
      <p>-or-</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form>
        <label htmlFor="token">Share token</label>
        <input type="text" name="token" />
        <button type="submit"> Join an existing list</button>
      </form>
    </div>
  );
};

export default Home;