import React from 'react';
import { Form, Col, Container }  from 'react-bootstrap'

export default ()=>
  <Container>
    <Form className='mt-4'>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Year</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Sort By</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Genres</Form.Label>
          <Form.Control placeholder='Filter by genres...'/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Keywords</Form.Label>
          <Form.Control placeholder='Filter by keywords...'/>
        </Form.Group>
      </Form.Row>
    </Form>
  </Container>