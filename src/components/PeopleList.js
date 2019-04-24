import React from 'react';
import { Container, Row, Col, Card, Spinner }  from 'react-bootstrap'
import { config } from '../config';
import history from '../history';


const CardMy = ({profile_path, name, known_for, id}) =>{
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
        {known_for && known_for.map(item=>item.original_title || item.original_name).join(', ').substr(0, 40)}...
      </Card.Text>
    </Card.Body>
  </Card>
}

export default ({results})=>
  <Container className='main mt-3'>
    <Row>
      <Col>
        <h1 className='main m-4'>Popular People</h1>
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
          <CardMy {...item} />
        </Col>)
      }
    </Row>
  </Container>