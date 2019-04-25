import React from 'react';
import { Container, Row, Col, Card, Spinner }  from 'react-bootstrap'
import { config } from '../config';
import CircularProgressBar from './CircularProgressBar';


const Loading = () =>
  <Container className='text-center'>
    <Spinner animation="border" className='m-5' role="status">
      <span className="sr-only">Loading...</span>
    </Spinner> 
  </Container>


export default ({json})=>{
  const handleClick = (e)=>{
    // console.log(e);
  }
  // console.log(json);

  let date = json.release_date || json.first_air_date;
  let name = json.original_title || json.name;

  if(!name) return <Loading />;
  return (
    <React.Fragment>
    <Container 
      className='text-light' 
      fluid
      style={{
        background: 
        `linear-gradient(to left, rgba(8,15,23,0.9), rgba(38,44,47,0.99)),
 url("${config.imgLink+json.backdrop_path}") no-repeat fixed center /cover`}}

    >
      <Container className='py-5'
      >
        <Row >
          <Col md={3}>
            <Card >
              <Card.Img 
                variant="top"
                src={json.poster_path? 
                  config.imgLink+json.poster_path
                  : 'http://cdn.onlinewebfonts.com/svg/img_210318.png'}
                className='mouse-pointer img-fluid'
                onClick={handleClick}
              />
            </Card>
          </Col>
          <Col >
            <h1>{name} <span className='h2 text-secondary'>({date.slice(0,4)})</span></h1>
  
            <Row className='align-items-center justify-content-left my-4'>
                <Col md={'auto'} className='pr-0'>
                  <CircularProgressBar
                  strokeWidth="7"
                  sqSize="65"
                  percentage={json.vote_average*10}/>
                </Col>
                <Col md={'auto'}>
                  <strong>User<br />Score</strong>
                </Col>
            </Row>

            <h4>Overview</h4>
            <p>{json.overview}</p>
            {json.created_by && <h4>Featured Crew</h4>}
            <Row>
              {json.created_by && json.created_by.map((elem, i)=><Col key={i} md={3}><strong>{elem.name}</strong><p className='text-secondary'>creator</p></Col>)}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
    <Container className='py-5'>
            <Row className='justify-content-center'>
        </Row>
    </Container>
  </React.Fragment>
  )
}