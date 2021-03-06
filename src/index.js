/* eslint-disable no-unused-vars */
import React from 'react';
import 'normalize.css';
import { render } from 'react-dom';
import App from './App';
import { GlobalStyles } from './GlobalStyles';
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';

render(
  <>
    <FirebaseContext.Provider value={{ firebase }}>
      <GlobalStyles />
      <App />
    </FirebaseContext.Provider>
  </>,
  document.getElementById('root')
);
