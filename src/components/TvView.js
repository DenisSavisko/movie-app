import React from 'react';
import MoviesListContainer from './MoviesListContainer';

export default (props)=>
  <MoviesListContainer 
    {...props} 
    compTitle='Popular TV Shows'
    compDescQuant={60}
  />