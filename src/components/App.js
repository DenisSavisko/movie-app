import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Router } from "react-router-dom";
import history from '../history';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const store = configureStore(); // You can also pass in an initialState here

history.listen(({pathname}) => { // location to redux;
  if(store.getState().state.urlPathNow !== pathname){
    store.dispatch({type:'PAGE_CHANGE', payload:1}); // remove state.json only when path changed
    store.dispatch({type:'FETCH_TO_STATE', payload:{}}); // remove state.json only when path changed
    store.dispatch({type:'HISTORY_UPDATE', payload:pathname});
  }
});

export default () =>
  <Provider store={store}>
    <Router history={history}>
      <Header />
      <Main />
      <Footer />
    </Router>
  </Provider>