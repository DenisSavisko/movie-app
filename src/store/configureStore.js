import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';




export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined 
    && 
    process.env.NODE_ENV === 'development'? // if redux-dev-tools instaled and dev mode, add redux dev tools middlware
      compose(
        applyMiddleware(thunk),
        composeWithDevTools()
      ) :
      (applyMiddleware(thunk))
  );
}