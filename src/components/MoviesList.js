import React from 'react';
import { Container, Row, Col, Card, Spinner }  from 'react-bootstrap'
import { config } from '../config';
import history from '../history';
import dateToString from '../services/dateToString'
import CircularProgressBar from './CircularProgressBar';


const CardMy = ({id, vote_average, first_air_date, release_date, poster_path, title, original_title, name, overview, descriptionQuantity}) =>{
  let idOfUser = id;
  let tvOrMovie = first_air_date? 'tv': 'movie';
  const handleClick = (e) => {
    history.push(`/${tvOrMovie}/${idOfUser}`)
  }

  let nameOfMovie = original_title || title || name;
  let date = release_date || first_air_date;
  date = dateToString(date);

  return <Card >
  <Row>
    <Col sm={5}>
      <Card.Img 
        variant="top" 
        src={config.imgLink+poster_path}
        className='mouse-pointer'
        onClick={handleClick}
      />
    </Col>
    <Col sm={7} className='pl-0'>
      <Card.Body>
        <Row className='align-items-center justify-content-left'>
          <Col xs={'auto'} className='pr-0' >
            <CircularProgressBar
            strokeWidth="7"
            sqSize="48"
            percentage={vote_average*10}/>
          </Col>
          <Col xs={'auto'}>

            <Card.Title
              className='mouse-pointer'
              onClick={handleClick}
            >
              {nameOfMovie}
            </Card.Title>
            <Card.Subtitle className='text-secondary'>
              {date}
            </Card.Subtitle>
          </Col>
        </Row>

        <Card.Text className='mt-4 d-none d-sm-block'>
          {overview && overview.substr(0, descriptionQuantity)} ...
        </Card.Text>
      </Card.Body>
    </Col>
  </Row>
  </Card>
}

export default ({results, compTitle='Unnamed component', compDescQuant=215})=>
  <Container className='mt-3'>
    <Row>
      <Col>
        <h1>{compTitle}</h1>
      </Col>
    </Row>
    <Row className='justify-content-center'>
      { !results ? 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      :
        results.map((item,i)=>
        <Col className='mb-3' sm={12} lg={6} key={i}>
          <CardMy 
            {...item} 
            descriptionQuantity={compDescQuant}
          />
        </Col>)
      }
    </Row>
  </Container>