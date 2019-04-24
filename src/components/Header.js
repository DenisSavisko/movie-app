import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Form, FormControl, Image, Container, Row, Col }  from 'react-bootstrap'
import logo from '../img/logo.svg'


export default (props) =>
  <div>
  <Navbar bg="light" expand="lg">
    <Link to='/trending/all/day' className='nav nav-link nav-brand'><Image href='/trending/all/day' src={logo} style={{maxWidth:250}}/></Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <div className='nav-main-link'>
          <Link to='/discover/movie?year=2018' className='nav nav-link'>DISCOVER</Link>
          <div className='nav-aditional-link'>
            <Link to='/discover/movie?year=2018' className='nav nav-link'>Movies</Link>
            <Link to='/discover/tv?first_air_date_year=2018' className='nav nav-link'>TV shows</Link>
          </div>
        </div>
        <div className='nav-main-link'>
          <Link to='/movie/popular?page=1' className='nav nav-link'>MOVIES</Link>
          <div className='nav-aditional-link'>
            <Link to='/movie/popular' className='nav nav-link'>Popular</Link>
            <Link to='/movie/top_rated' className='nav nav-link'>Top Rated</Link>
            <Link to='/movie/upcoming' className='nav nav-link'>Upcoming</Link>
            <Link to='/movie/now_playing' className='nav nav-link'>Now playing</Link>
          </div>
        </div>
        <div className='nav-main-link'>
          <Link to='/tv/popular' className='nav nav-link'>TV SHOWS</Link>
          <div className='nav-aditional-link'>
            <Link to='/tv/popular' className='nav nav-link'>Popular</Link>
            <Link to='/tv/top_rated' className='nav nav-link'>Top Rated</Link>
            <Link to='/tv/on_the_air' className='nav nav-link'>On TV</Link>
            <Link to='/tv/airing_today' className='nav nav-link'>Airing Today</Link>
          </div>
        </div>
        <div className='nav-main-link'>
          <Link to='/person/popular' className='nav nav-link'>PEOPLE</Link>
          <div className='nav-aditional-link'>
            <Link to='/person/popular' className='nav nav-link'>Popular people</Link>
          </div>
          </div>
      </Nav>
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