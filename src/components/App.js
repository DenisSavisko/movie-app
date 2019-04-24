import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Router } from "react-router-dom";
import history from '../history';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export const store = configureStore(); // You can also pass in an initialState here
export default () =>
  <Provider store={store}>
    <Router history={history}>
      <Header />
      <Main />
      <Footer />   
    </Router>
  </Provider>