import { combineReducers } from 'redux';
import state from './state';
import json from './fetchedData';

export default combineReducers({
  state,
  json,
});
