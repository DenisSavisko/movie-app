import React, {useState} from 'react';
import { Container, Row, Col, Tab, ListGroup }  from 'react-bootstrap'
// import { config } from '../config';
// import history from '../history';
// import dateToString from '../services/dateToString'
import List from './List';

export default (props) =>{
  let [category, setCat] = useState('Movies');

  return <Container>
    <Row>
      <Col md={4}>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>;
      </Col>
      <Col md={8}>
        <List {...props} compTitle={`Search → ${category}`} columns={12} />
      </Col>
    </Row>
  </Container>
}