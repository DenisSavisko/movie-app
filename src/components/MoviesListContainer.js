import React from 'react';
import { Container, Row, Col, Card, Spinner }  from 'react-bootstrap'
import { config } from '../config';
import history from '../history';

const CardMy = ({id, first_air_date, poster_path, title, overview, descriptionQuantity}) =>{
  let idOfUser = id;
  let tvOrMovie = first_air_date? 'tv': 'movie';
  const handleClick = (e) => {
    history.push(`/${tvOrMovie}/${idOfUser}`)
  }

  return <Card >
    <Card.Img 
      variant="top" 
      src={config.imgLink+poster_path}
      className='mouse-pointer'
      onClick={handleClick}
    />
    <Card.Body>
      <Card.Title
        className='mouse-pointer'
        onClick={handleClick}
      >
        {title}
      </Card.Title>
      <Card.Text>
        {overview && overview.substr(0, descriptionQuantity)}...
      </Card.Text>
    </Card.Body>
  </Card>
}

export default ({results, compTitle='Unnamed component', compDescQuant=60})=>
  <Container className='main mt-3'>
    <Row>
      <Col>
        <h1 className='main m-4'>{compTitle}</h1>
      </Col>
    </Row>
    <Row className='justify-content-center'>
      { !results ? 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      :
        results.map((item,i)=>
        <Col className='col-md-3 mb-3' key={i}>
          <CardMy 
            {...item} 
            descriptionQuantity={compDescQuant}
          />
        </Col>)
      }
    </Row>
  </Container>