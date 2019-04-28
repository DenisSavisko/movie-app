import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import history from '../history';
import { fetchData } from '../actions/fetch';

const SearchList = ({
  id,
  first_air_date,
  original_title,
  title,
  name,
  media_type,
}) => {
  const idOfUser = id;
  let tvOrMovieOrPerson = first_air_date ? 'tv' : 'movie';
  if (media_type) tvOrMovieOrPerson = media_type;
  const handleClick = () => {
    history.push(`/${tvOrMovieOrPerson}/${idOfUser}`);
  };

  return (
    <Row
      className="border-top mouse-pointer hoverable"
      onMouseDown={e => handleClick(e)}
    >
      <Container>
        <Col md="12">{original_title || title || name}</Col>
      </Container>
    </Row>
  );
};

const Search = ({ json, fetchAditional }) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setState] = useState('');

  const trendingSearchJson = {
    path: '/trending/all/day',
    nameJson: 'searchJsonTrend',
  };

  const searchTrending =
    json && json.searchJsonTrend && json.searchJsonTrend.results;

  const handleFocus = (e, bool) => {
    setFocused(bool);
    if (!bool) return setState('');
    fetchAditional(trendingSearchJson);
  };

  const handleChange = e => {
    const { value } = e.target;
    setState(value);
    if (value === '') return fetchAditional(trendingSearchJson);
    const mutliSearchJson = {
      path: '/search/multi',
      nameJson: 'searchJsonTrend',
      paramsObj: { query: value },
    };
    return fetchAditional(mutliSearchJson);
  };

  const handleSubmit = e => {
    history.push(`/search/${searchTrending[0].media_type}?query=${inputValue}`);
    e.preventDefault();
  };

  return (
    <Container fluid className="border-bottom">
      <Container>
        <Row className="my-1">
          <Col xs="12">
            <Form
              onFocus={e => handleFocus(e, true)}
              onBlur={e => handleFocus(e, false)}
              onSubmit={e => handleSubmit(e)}
            >
              <FormControl
                value={inputValue}
                onChange={e => handleChange(e)}
                type="text"
                placeholder="Search a movie, tv-show or person..."
                className="mr-sm-12 border-0"
              />
            </Form>
          </Col>
        </Row>
      </Container>
      {focused && searchTrending && (
        <Container fluid className="search-results bg-white border-bottom">
          <Container>
            <Col md="12">
              <h2>Trending results</h2>
            </Col>
          </Container>
          {searchTrending.map((elem, i) => (
            <SearchList {...elem} key={i} />
          ))}
        </Container>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    json: state.json,
    loadingCount: state.state.loadingCount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAditional: params => dispatch(fetchData(params)),
    resultsJsonReset: () => dispatch({ type: 'RESET_RESULTS_IN_STORE' }),
    setUrlParams: obj => dispatch({ type: 'URL_PARAMS_SET', payload: obj }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
