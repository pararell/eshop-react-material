import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from './Routes';

const browserHistory = createBrowserHistory();


export default function App() {
  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}
