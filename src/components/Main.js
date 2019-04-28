import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import history from '../history';
import { handlePageChange, handleHistoryOnChange } from '../actions/state';
import { fetchData } from '../actions/fetch';
import LandingView from './LandingView';
import Person from './Person';
import List from './List';
import Movie from './Movie';
import SearchPage from './SearchPage';
import DiscoverForm from './DiscoverForm';
import Paginator from './Paginator';

const Main = ({ loadingCount, fetchDataJson, historyOnChange, ...props }) => {
  useEffect(() => {
    // location to redux
    history.listen(({ pathname, search }) => {
      historyOnChange(pathname, search); // dispatch events onChange history
    });
  }, []);

  useEffect(() => {
    fetchDataJson(); // fetch initial & onChange loadingCount(onchange history)
  }, [loadingCount]);

  const movieLists = [
    // arr of identical pages
    {
      path: '/tv/(popular|top_rated|on_the_air|airing_today)/',
      title: 'TV Shows',
    },
    {
      path: '/movie/(popular|top_rated|upcoming|now_playing)/',
      title: 'Movies',
    },
    {
      path: '/discover/*',
      customComp: (
        <div>
          <DiscoverForm />
          <List
            {...props}
            compTitle="Discover New Movies & TV Shows Movies TV Shows"
          />
        </div>
      ),
    },
    {
      path: '/person/popular',
      customComp: (
        <List {...props} compTitle="Popular People" columns={{ md: 3 }} />
      ),
    },
    {
      path: '/person/popular',
      customComp: (
        <List {...props} compTitle="Popular People" columns={{ md: 3 }} />
      ),
    },
    {
      path: '/person/popular',
      customComp: (
        <List {...props} compTitle="Popular People" columns={{ md: 3 }} />
      ),
    },
    {
      path: '/person/popular',
      customComp: (
        <List {...props} compTitle="Popular People" columns={{ md: 3 }} />
      ),
    },
  ];

  return (
    <div>
      <Switch>
        {movieLists.map((
          elem,
          i // map movieList arr to Route's
        ) => (
          <Route
            key={<i />}
            exact
            path={elem.path}
            render={() =>
              elem.customComp ? (
                elem.customComp
              ) : (
                <List {...props} compTitle={elem.title} />
              )
            }
          />
        ))}
        <Route exact path={['/']} component={LandingView} />
        <Route exact path="/person/*" render={() => <Person {...props} />} />
        <Route
          exact
          path="/(movie|tv)/*/"
          render={() => <Movie {...props} />}
        />
        <Route
          exact
          path="/search/*"
          render={() => <SearchPage {...props} />}
        />
      </Switch>
      <Paginator {...props} />
    </div>
  );
};

Main.propTypes = {
  loadingCount: PropTypes.number.isRequired,
  historyOnChange: PropTypes.func.isRequired,
  fetchDataJson: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    results: state.json.results,
    json: state.json,
    page: state.json.page,
    totalPages: state.json.total_pages,
    urlPathNow: state.state.urlPathNow,
    loadingCount: state.state.loadingCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDataJson: () => dispatch(fetchData()),
    handlePageChange: e => dispatch(handlePageChange(e)),
    historyOnChange: (path, search) =>
      dispatch(handleHistoryOnChange(path, search)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
