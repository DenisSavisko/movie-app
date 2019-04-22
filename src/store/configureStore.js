import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    process.env.NODE_ENV==='development'? (
    compose(    // add redux-dev-tools. If not instaled on chrome, throw error
      applyMiddleware(thunk),
      composeWithDevTools()
    )) :
    (applyMiddleware(thunk))
  );
}