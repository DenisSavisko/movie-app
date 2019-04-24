import React from 'react';
import MoviesListContainer from './MoviesListContainer';

export default (props)=>
  <MoviesListContainer 
    {...props} 
    compTitle='Popular movies'
    compDescQuant={60}
  />