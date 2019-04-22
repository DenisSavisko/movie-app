import React from 'react';
import { Container, Row, Col, Card }  from 'react-bootstrap'
import { config } from '../config';


const CardMy = ({profile_path, name, known_for}) =>
  <Card >
    <Card.Img variant="top" src={config.imgLink+profile_path}/>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        {known_for.map(item=>item.original_title || item.original_name).join(', ').substr(0, 40)}...
      </Card.Text>
    </Card.Body>
  </Card>

export default ({results})=>{

  return <Container className='main mt-3'>
    <Row>
      <Col>
        <h1 className='main m-4'>Popular People</h1>
      </Col>
    </Row>

    <Row className='justify-content-center'>
      { results && 
        results.map((item,i)=>
        <Col className='col-md-3 mb-3' key={i}>
          <CardMy {...item}/>
          
        </Col>)
      }
    </Row>
  </Container>
}