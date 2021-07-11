import React from 'react';
import './App.css';
import ItemsList from './ItemsList';
import AddItem from './AddItem';

function App() {
  return (
    <div className="App">
      <ItemsList />
      <AddItem />
    </div>
  );
}

export default App;
