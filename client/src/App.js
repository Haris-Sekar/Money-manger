import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Header from './header/Header'


function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </>
  );
}

export default App;
