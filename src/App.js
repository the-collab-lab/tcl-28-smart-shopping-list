import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddItem from './AddItem';
import ItemsList from './ItemsList';
import Footer from './Footer';
import Home from './Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddItem} />
        <Route path="/list" component={ItemsList} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
