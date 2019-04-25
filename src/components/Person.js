import React, {useState} from 'react';
import { Container, Row, Col, Card, Spinner, Button, Collapse, Nav, NavDropdown }  from 'react-bootstrap'
import { config } from '../config';
import history from '../history';


const CardMy = ({profile_path, birthday, homepage, place_of_birth, known_for_department, also_known_as, gender, id}) =>{
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
      <Card.Title>Personal info</Card.Title>
      <Card.Subtitle>Known for</Card.Subtitle>
      <Card.Text>{known_for_department}</Card.Text>
      <Card.Subtitle>Gender</Card.Subtitle>
      <Card.Text>{gender===1? 'female': 'male'}</Card.Text>
      <Card.Subtitle>Known Credits</Card.Subtitle>
      <Card.Text>???</Card.Text>
      <Card.Subtitle>Birthday</Card.Subtitle>
      <Card.Text>{birthday}</Card.Text>
      <Card.Subtitle>Place of Birth</Card.Subtitle>
      <Card.Text>{place_of_birth}</Card.Text>
      <Card.Subtitle>Official Site</Card.Subtitle>
      <Card.Text>{homepage? <a target='_blank' rel='noopener noreferrer' href={homepage}>{homepage}</a>:'-'}</Card.Text>
      <Card.Subtitle>Also Known As</Card.Subtitle>
      {also_known_as && also_known_as.map((val,i)=><Card.Text key={i}>{val}</Card.Text>)}
    </Card.Body>
  </Card>
}

const Loading = () =>
  <Container className='text-center'>
    <Spinner animation="border" className='m-5' role="status">
      <span className="sr-only">Loading...</span>
    </Spinner> 
  </Container>


export default ({json})=>{
  let [open, setState] = useState(false);
  console.log(json);
  if(!json.name) return <Loading />;
  return (
    <Container className='main my-5'>
      <Row>
        <Col md={4}>
          <CardMy {...json}/>
        </Col>
        <Col >
          <h1>{json.name}(links)</h1>
          <h3>Biography</h3>
          {json.biography.split('\n').slice(0,2).map((item, i) => <p key={i}>{item}</p>)}
          <p>
            {json.biography.split('\n').slice(2,3)}
            <Collapse in={!open}><span>...</span></Collapse>
          </p>

          <Collapse in={open}>
            <div id="example-collapse-text">
            {json.biography.split('\n').slice(3).map((item, i) => <p key={i}>{item}</p>)}
            </div>
          </Collapse>
          <Button
            onClick={() => setState(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="light"
          >
            {!open? '▽':'△'} Full bio
          </Button>

          {/*<Nav
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            className='my-5'
          >
            <Nav.Item>
              <Nav.Link href="/home">Images</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Changes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Share</Nav.Link>
            </Nav.Item>
            <NavDropdown title="Discussions" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">
                Something else here
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <h3>Known for</h3>
          fetch movies...
          <h3>acting...</h3>
          fetch credits...*/}
        </Col>
      </Row>
      <Row className='justify-content-center'>
      </Row>
    </Container>
  )
}