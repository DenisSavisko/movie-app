import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Image, Container, Row, Col }  from 'react-bootstrap'
import logo from '../img/logo.svg'


export default (props) =>
  <div>
  <Navbar bg="light" expand="lg">
    <Link to='/trending/all/day' className='nav nav-link nav-brand'><Image href='/trending/all/day' src={logo} style={{maxWidth:250}}/></Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to='/discover/movie?year=2018' className='nav nav-link'>DISCOVER</Link>
        <Link to='/movie/popular?page=2' className='nav nav-link'>MOVIES</Link>
        <Link to='/tv/popular' className='nav nav-link'>TV SHOWS</Link>
        <Link to='/person/popular' className='nav nav-link'>PEOPLE</Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
  <Container fluid>
      <Row>
        <Col md='12'>
          <Form >
            <FormControl style={{padding:'0 15vw',borderTop:'none',borderLeft:'none',borderRight:'none'}}type="text" placeholder="Search a movie, tv-show or person..." className="mr-sm-12" />
          </Form>
        </Col>
      </Row>
  </Container>
  </div>