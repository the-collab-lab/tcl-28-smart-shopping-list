import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemsList from './components/ItemsList';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddItem} />
        <Route path="/list" component={ItemsList} />
      </Switch>
    </div>
  );
}

export default App;
