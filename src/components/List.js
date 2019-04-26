import React from 'react';
import { Container, Row, Col, Card, Spinner }  from 'react-bootstrap'
import { config } from '../config';
import history from '../history';
import dateToString from '../services/dateToString'
import CircularProgressBar from './CircularProgressBar';


const CardMovies = ({id, vote_average, first_air_date, release_date, poster_path, title, original_title, name, overview, descriptionQuantity}) =>{
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

const CardPersons = ({profile_path, name, known_for, id, descriptionQuantity=45}) =>{
  let idOfUser = id;
  const handleClick = (e) => {
    history.push(`/person/${idOfUser}`)
  }

  return <Card >
    <Card.Img 
      variant="top" 
      src={profile_path? 
        config.imgLink+profile_path
        : 'http://cdn.onlinewebfonts.com/svg/img_210318.png'}
      className='mouse-pointer'
      onClick={handleClick}
    />
    <Card.Body>
      <Card.Title className='mouse-pointer' onClick={handleClick}>{name}</Card.Title>
      <Card.Text>
        {known_for && known_for.map(item=>item.original_title || item.original_name).join(', ').substr(0, descriptionQuantity)}...
      </Card.Text>
    </Card.Body>
  </Card>
}

export default ({results, compTitle='Unnamed component', compDescQuant=215, columns={lg:6}})=>{
  console.log(results);
  return <Container className='mt-3'>
    <Row>
      <Col>
        <h1 className='m-4'>{compTitle}</h1>
      </Col>
    </Row>
    <Row className='justify-content-center'>
      { !results ? 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      :
        results.map((item,i)=>
        <Col className='mb-3' sm={12} {...columns} key={i}>
          { item.profile_path || item.profile_path===null ? <CardPersons {...item} descriptionQuantity={compDescQuant} />
              : 
            <CardMovies {...item} descriptionQuantity={compDescQuant} />
          }
        </Col>)
      }
    </Row>
  </Container>
}