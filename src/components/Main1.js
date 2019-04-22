import React from 'react';
import { Route, Switch } from "react-router-dom";
import ListPage from './ListPage';

export default (props)=>
  <Switch>
    <Route exact path='/' component={ListPage} />
    <Route exact path='/people' component={People} />
  </Switch>