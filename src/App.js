import React from 'react';
import { Router, Route } from 'react-router-dom';
import AddItem from './AddItem';
import ItemsList from './ItemsList';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/add" component={AddItem} />
        <Route path="/list" component={ItemsList} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
