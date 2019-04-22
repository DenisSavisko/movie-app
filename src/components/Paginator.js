import React from 'react';
import { Container, Button, Row, Col }  from 'react-bootstrap'


export default ({page, totalPages, handlePageChange})=>
<Container className='text-center'>
  <Row>
    <Col>

      { 
        page > 1 && 
        <Button variant="outline-primary" value='prev' onClick={handlePageChange}>
          {'<-Prev'}
        </Button>

      }
      {page && 
      <Button variant="outline-primary" disabled>
          {page}
        </Button>
      }
      { 
        page < totalPages && 
        <Button variant="outline-primary" value='next' onClick={handlePageChange}>
          {'Next->'}
        </Button>
      }
    </Col>
  </Row>
</Container>