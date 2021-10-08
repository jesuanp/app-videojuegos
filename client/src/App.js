import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from './components/card/Card';
import Nav from './components/nav/Nav';
import InputSearch from './components/nav/InputSearch';
import Inicio from './components/inicio/Inicio'
import Details from './components/details/Details';
import Cargando from './components/cargando/Cargando'
import Order from './components/order/Order';
import Form from './components/form/Form';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">

      <Route exact path="/">
        <Suspense>
          <Inicio />
        </Suspense>
      </Route>

      <Route exact path="/app/home/:pagina">
        <Suspense>
          <Nav />
          <InputSearch />
          <Order />
          <Card />
        </Suspense>
      </Route>

      <Route exact path="/app/detalles">
        <Suspense>
          <Nav />
          <Details />
        </Suspense>
      </Route>

      <Route exact path="/app/post">
        <Suspense>
          <Nav />
          <Form />
        </Suspense>
      </Route>

    </div>
    </Router>
  );
}

export default App;
