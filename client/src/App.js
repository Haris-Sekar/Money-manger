import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Chart from './pages/Chart'
import Header from './header/Header'



function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/charts' component={Chart} />
      </Switch>
    </>
  );
}

export default App;
