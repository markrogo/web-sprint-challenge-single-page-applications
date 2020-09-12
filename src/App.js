import React from "react";
import { Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';



const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/pizza">
            <Form />
        </Route>
      </Switch>
    </>
  );
};
export default App;
