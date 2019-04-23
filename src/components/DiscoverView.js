import React,{ useEffect } from 'react';
import { Container, Row, Col, Card }  from 'react-bootstrap'
import { config } from '../config';

const CardMy = ({poster_path, name, overview}) =>
  <Card >
    <Card.Img variant="top" src={config.imgLink+poster_path}/>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        {overview.substr(0, 60)}...
      </Card.Text>
    </Card.Body>
  </Card>

export default ({results})=>
  <Container className='main mt-3'>
    <Row>
      <Col>
        <h1 className='main m-4'>Discover New Movies & TV Shows Movies TV Shows</h1>
      </Col>
    </Row>
    <Row className='justify-content-center'>
      { !results ? 'LOADING...' :
        results.map((item,i)=>
        <Col className='col-md-3 mb-3' key={i}>
          <CardMy {...item}/>
        </Col>)
      }
    </Row>
  </Container>