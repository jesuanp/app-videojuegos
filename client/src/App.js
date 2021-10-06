import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from './components/card/Card';
import Nav from './components/nav/Nav';
import TodosLosJuegos from './components/todosLosJuegos/TodosLosJuegos';
import Inicio from './components/inicio/Inicio'
import Details from './components/details/Details';
import Cargando from './components/cargando/Cargando'
import Order from './components/order/Order';
import './App.css';

const gif = lazy(()=> import('./components/images/pacman9.gif'))

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/">
        <Suspense fallback={<Cargando />}>
          <Inicio />
        </Suspense>
      </Route>
      <Route path="/videojuegos/">
        <Nav />
      </Route>
      <Route exact path="/videojuegos/todos">
        <Suspense fallback={<Cargando />}>
          <TodosLosJuegos />
        </Suspense>
      </Route>
      <Route exact path="/videojuegos/home">
        <Suspense fallback={<Cargando />}>
          <Order />
          <Card />
        </Suspense>
      </Route>
      <Route exact path="/videojuegos/detalles">
        <Suspense fallback={<Cargando />}>
          <Details />
        </Suspense>
      </Route>
    </div>
    </Router>
  );
}

export default App;
