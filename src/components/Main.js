import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData, handlePageChange } from '../actions/state';
import ListPageView from './ListPageView';
import PeopleView from './PeopleView';
import Paginator from './Paginator';
import TvView from './TvView';
import MoviesView from './MoviesView';
import DiscoverView from './DiscoverView';
import PersonView from './PersonView';
import MovieView from './MovieView';
import { Route, Switch } from "react-router-dom";


import historyParamsToObj from '../services/historyParamsToObj';
import { store } from './App';
import history from '../history';


const Main = (props)=>{

  useEffect(()=>{  // location to redux; dispatch events onChange history
    history.listen(({pathname, search}) => {
      store.dispatch({type:'URL_PARAMS_SET', payload:historyParamsToObj(search)}); //set urlParams in store to params from link;
      store.dispatch({type:'HISTORY_UPDATE', payload:pathname}); //set history link to link in redux;
      store.dispatch({type:'RESET_RESULTS_IN_STORE'}); //set results to 0;
      store.dispatch({type:'LOADING_COUNT'}); // count ++ to fetch data with params when history changed;
    });
  }
  ,[]);
  
  useEffect(()=>{
    props.fetchData(); // fetch initial
  }
  ,[props.loadingCount]);

  return (
    <div>
      <Switch>
        <Route exact path='/trending/*' render={()=><ListPageView {...props} />} />
        <Route exact path='/' render={()=><ListPageView {...props} />} />
        <Route exact path='/person/popular' render={()=><PeopleView {...props}/>} />
        <Route exact path='/person/*' render={()=><PersonView {...props}/>} />
        <Route exact path='/tv/(popular|top_rated|on_the_air|airing_today)/' render={()=><TvView {...props}/>} />
        <Route exact path='/tv/*/' render={()=><MovieView {...props} />} />
        <Route exact path='/movie/(popular|top_rated|upcoming|now_playing)/' render={()=><MoviesView {...props}/>} />
        <Route exact path='/movie/*/' render={()=><MovieView {...props} />} />
        <Route exact path='/discover/*' render={()=><DiscoverView {...props}/>} />
      </Switch>
      <Paginator {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    results: state.state.json.results,
    json: state.state.json,
    page: state.state.json.page,
    totalPages: state.state.json.total_pages,
    urlPathNow: state.state.urlPathNow,
    loadingCount: state.state.loadingCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (path) => dispatch(fetchData(path)),
    handlePageChange: (e) => dispatch(handlePageChange(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);