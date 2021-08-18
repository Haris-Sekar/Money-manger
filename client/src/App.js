import React, {useContext} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import Chart from './pages/Chart'
import Header from './header/Header'
import Auth from './pages/Auth'
import {GlobalContext} from './contexts/AppContext'
import './App.css'


function App() {
	let routes
  const {user: {token}} = useContext(GlobalContext)
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chart" component={Chart} />
        <Route exact path="/auth" component={Auth} />
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route
						path='/'
						exact
						component={() => <Redirect to='/auth' />}
					/>
        <Route exact path="/auth" component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    )
  }
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

export default App;
