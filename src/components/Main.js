import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import history from '../history';
import { handlePageChange, handleHistoryOnChange } from '../actions/state';
import { fetchData } from '../actions/fetch';
import LandingView from './LandingView';
import PeopleList from './PeopleList';
import Person from './Person';
import MoviesList from './MoviesList';
import Movie from './Movie';
import DiscoverForm from './DiscoverForm';
import Paginator from './Paginator';

const Main = (props)=>{
  useEffect(() => {  // location to redux
    history.listen(({pathname, search}) => {
      props.handleHistoryOnChange(pathname, search); //dispatch events onChange history
    });
  },[]);
  
  useEffect(()=>{
    props.fetchData(); // fetch initial & onChange loadingCount(onchange history)
  },[props.loadingCount]);

  let movieLists = [ // arr of identical pages
    {path:'/tv/(popular|top_rated|on_the_air|airing_today)/', title: 'Popular TV Shows'},
    {path:'/movie/(popular|top_rated|upcoming|now_playing)/', title: 'Popular movies'},
    {path:'/discover/*',customComponents: 
      <div>
        <DiscoverForm />
        <MoviesList {...props} compTitle='Discover New Movies & TV Shows Movies TV Shows'/>
      </div>
    },
  ];

  return (
    <div>
      <Switch>
        {movieLists.map((elem, i) => // map movieList arr to Route's
          <Route key={<i></i>} exact path={elem.path} render = {()=>
              elem.customComponents? elem.customComponents
              : <MoviesList {...props} compTitle={elem.title}/>
          }/>
        )}
        <Route exact path={['/']} component={LandingView} />
        <Route exact path='/person/popular' render={()=><PeopleList {...props}/>} />
        <Route exact path='/person/*' render={()=><Person {...props}/>} />
        <Route exact path='/(movie|tv)/*/' render={()=><Movie {...props} />} />
      </Switch>
      <Paginator {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    results: state.json.results,
    json: state.json,
    page: state.json.page,
    totalPages: state.json.total_pages,
    urlPathNow: state.state.urlPathNow,
    loadingCount: state.state.loadingCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
    handlePageChange: (e) => dispatch(handlePageChange(e)),
    handleHistoryOnChange: (path, search) => dispatch(handleHistoryOnChange(path, search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);