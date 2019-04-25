import React, { useState } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { Form, FormControl, Container, Row, Col }  from 'react-bootstrap'
import { fetchData } from '../actions/fetch';


const SearchList = ({id, first_air_date, original_title, title, name, media_type}) =>{
  let idOfUser = id;
  let tvOrMovieOrPerson = first_air_date? 'tv': 'movie';
  if(media_type) tvOrMovieOrPerson = media_type;
  const handleClick = (e) => {
    history.push(`/${tvOrMovieOrPerson}/${idOfUser}`)
  };
  
  return <Row className='border-top mouse-pointer search-list' onMouseDown={(e)=>handleClick(e)}>
    <Container >
      <Col md='12' >
        {original_title || title || name}
      </Col>
    </Container>
  </Row>
}

const Search = ({id, first_air_date, json, fetchAditional, resultsJsonReset, loadingCount, setUrlParams, media_type})=>{
  let [focused, setFocused] = useState(false);
  let [inputValue, setState] = useState('');

  let trendingSearchJson = {
    path:'/trending/all/day',
    nameJson:'searchJsonTrend',
  }

  let searchTrending = json && json.searchJsonTrend && json.searchJsonTrend.results;

  const handleFocus = (e, bool) => {
    setFocused(bool);
    if(!bool) return setState('');
    fetchAditional(trendingSearchJson);
  }

  const handleChange = (e) => {
    let value = e.target.value;
    setState(value);
    if(value==='') return fetchAditional(trendingSearchJson);
    let mutliSearchJson = {
      path:'/search/multi',
      nameJson:'searchJsonTrend',
      paramsObj:{query: value}
    };
    fetchAditional(mutliSearchJson);
  }
  
  const handleSubmit = (e) => {
    history.push(`/search/multi?query=${inputValue}`);
    e.preventDefault();
  }

  return <Container fluid className='border-bottom' >
    <Container>
      <Row className='my-1'>
        <Col xs='12'>
          <Form onFocus={(e)=>handleFocus(e, true)} onBlur={(e)=>handleFocus(e, false)} onSubmit={(e)=>handleSubmit(e)}>
            <FormControl value={inputValue} onChange={(e)=>handleChange(e)} type="text" placeholder="Search a movie, tv-show or person..." className="mr-sm-12 border-0" />
          </Form>
        </Col>

      </Row>
    </Container>
    {focused && searchTrending && <Container fluid  className='search-results bg-white border-bottom'>
      <Container>
        <Col md='12'>
          <h2>Trending results</h2>
        </Col>
      </Container>
      {searchTrending.map((elem, i)=>
        <SearchList {...elem}  key={i}/>
        )
      }
      </Container>
    }
  </Container>
}

const mapStateToProps = (state) => {
  return {
    json: state.json,
    loadingCount: state.state.loadingCount,
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchAditional: params => dispatch(fetchData(params)),
    resultsJsonReset: () => dispatch({type:'RESET_RESULTS_IN_STORE'}),
    setUrlParams: (obj) => dispatch({type:'URL_PARAMS_SET', payload:obj})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);