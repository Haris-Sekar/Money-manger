import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter as Router} from "react-router-dom";
import App from './App';
import AppContext from './contexts/AppContext';

ReactDOM.render(
    <AppContext>
      <Router>
        <App />
      </Router>
    </AppContext>,
  document.getElementById('root')
);


