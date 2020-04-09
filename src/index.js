import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

import Store from './store';

ReactDOM.render(
  <Store>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Store>,
  document.getElementById('root')
);


serviceWorker.register();
