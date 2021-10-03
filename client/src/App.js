import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from './components/card/Card';
import Nav from './components/nav/Nav';
import TodosLosJuegos from './components/todosLosJuegos/TodosLosJuegos';
import Inicio from './components/inicio/Inicio'
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/">
        <Inicio />
      </Route>
      <Route path="/videojuegos/">
        <Nav />
      </Route>
      <Route exact path="/videojuegos/todos">
        <TodosLosJuegos />
      </Route>
      <Route exact path="/videojuegos/home">
        <Card />
      </Route>
    </div>
    </Router>
  );
}

export default App;
