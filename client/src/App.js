import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Chart from './pages/Chart'
import Header from './header/Header'
import Auth from './pages/Auth'



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/charts' component={Chart} />
        <Route exact path='/auth' component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
