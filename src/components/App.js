import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Router } from "react-router-dom";
import history from '../history';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import historyParamsToObj from '../services/historyParamsToObj';


export const store = configureStore(); // You can also pass in an initialState here

history.listen(({pathname, ...location}) => { // location to redux;
  // if(store.getState().state.urlPathNow !== pathname){
    
    //set urlParams in store to params from link;
    store.dispatch({type:'URL_PARAMS_SET', payload:historyParamsToObj(location.search)});
    //set history link to link in redux;
    store.dispatch({type:'HISTORY_UPDATE', payload:pathname});
    //set results to 0;
    store.dispatch({type:'RESET_RESULTS_IN_STORE'}); // remove state.json only when path changed
    //fetch data with params;
    store.dispatch({type:'LOADING_COUNT'}); // remove state.json only when path changed
  // }
});

export default () =>
  <Provider store={store}>
    <Router history={history}>
      <Header />
      <Main />
      <Footer />
    </Router>
  </Provider>