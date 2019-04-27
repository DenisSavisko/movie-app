import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from '../store/configureStore';
import history from '../history';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export const store = configureStore(); // You can also pass in an initialState here
export default () => (
  <Provider store={store}>
    <Router history={history}>
      <div className="content">
        <Header />
        <Main />
      </div>
      <Footer />
    </Router>
  </Provider>
);
