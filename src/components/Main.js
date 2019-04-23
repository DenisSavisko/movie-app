import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData, handlePageChange } from '../actions/state';
import ListPageView from './ListPageView';
import PeopleView from './PeopleView';
import Paginator from './Paginator';
import TvView from './TvView';
import MoviesView from './MoviesView';
import DiscoverView from './DiscoverView';
import { Route, Switch } from "react-router-dom";

const ListPage = (props)=>{

  // useEffect(()=>{
  //   history.listen(({pathname, ...location}) => { // location to redux;
  //     // if(store.getState().state.urlPathNow !== pathname){
        
  //       //set urlParams in store to params from link;
  //       store.dispatch({type:'URL_PARAMS_SET', payload:historyParamsToObj(location.search)});
  //       //set history link to link in redux;
  //       store.dispatch({type:'HISTORY_UPDATE', payload:pathname});
  //       //set results to 0;
  //       store.dispatch({type:'RESET_RESULTS_IN_STORE'}); // remove state.json only when path changed
  //       //fetch data with params;
  //       store.dispatch({type:'LOADING_COUNT'}); // remove state.json only when path changed
  //     // }
  //   });
  // }
  // ,[]);
  
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
        <Route exact path='/tv/popular' render={()=><TvView {...props}/>} />
        <Route exact path='/movie/popular' render={()=><MoviesView {...props}/>} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);