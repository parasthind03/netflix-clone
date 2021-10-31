import React from 'react';
import 'normalize.css';
import { render } from 'react-dom';
import App from './app';
import { GlobalStyles } from './GlobalStyles';

render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root')
);
