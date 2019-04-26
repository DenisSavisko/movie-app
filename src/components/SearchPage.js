import React from 'react';
import { Container, Row, Col, Tab, ListGroup }  from 'react-bootstrap'
import { Link } from 'react-router-dom'
import history from '../history';
import List from './List';

export default (props) =>{
  let category = history.location.pathname.slice(8);
  category = category[0].toUpperCase()+category.slice(1); //capitalise

  return <Container>
    <Row>
      <Col md={3}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={12} className='mt-5'>
              <ListGroup>
                <ListGroup.Item className='hoverable'>
                  <Link to={`/search/movie${history.location.search}`} className='nav nav-link'>Movies</Link>
                </ListGroup.Item>
                <ListGroup.Item className='hoverable'>
                  <Link to={`/search/tv${history.location.search}`} className='nav nav-link'>TV shows</Link>
                </ListGroup.Item>
                <ListGroup.Item className='hoverable'>
                  <Link to={`/search/person${history.location.search}`} className='nav nav-link'>People</Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
      <Col md={9}>
        <List {...props} compTitle={`Search by ${category}`} columns={{lg:6}} />
      </Col>
    </Row>
  </Container>
}