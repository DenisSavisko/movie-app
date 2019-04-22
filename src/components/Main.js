import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData, pageChange, handlePageChange, jsonToState } from '../actions/state';
import ListPageView from './ListPageView';
import PeopleView from './PeopleView';
import Paginator from './Paginator';
import TvView from './TvView';
import MoviesView from './MoviesView';
import DiscoverView from './DiscoverView';
import { Route, Switch } from "react-router-dom";

const ListPage = (props)=>{
  
  useEffect(()=>{
    props.fetchData(); // fetch initial
  }
  ,[props.urlPathNow]);

  return (
    <div>
      <Switch>
        <Route exact path='/' render={()=><ListPageView {...props} />} />
        <Route exact path='/people' render={()=><PeopleView {...props}/>} />
        <Route exact path='/tv' render={()=><TvView {...props}/>} />
        <Route exact path='/movies' render={()=><MoviesView {...props}/>} />
        <Route exact path='/discover' render={()=><DiscoverView {...props}/>} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageChange: (page) => dispatch(pageChange(page)),
    fetchData: (path) => dispatch(fetchData(path)),
    handlePageChange: (e) => dispatch(handlePageChange(e)),
    jsonToState: (data) => dispatch(jsonToState(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);