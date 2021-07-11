import React from 'react';
import './App.css';
import ItemsList from './ItemsList';
import { fb } from './lib/firebase';

function App() {
  return (
    <div className="App">
      <ItemsList />
      <button>Add Item</button>
    </div>
  );
}

export default App;
