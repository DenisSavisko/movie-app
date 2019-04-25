import React from 'react';
import { Container, Button, Row, Col }  from 'react-bootstrap'

export default ({page, totalPages, handlePageChange})=>
<Container className='text-center my-5'>
  <Row>
    <Col>
      { page > 1 &&  // show prev if count page more than 1
        <Button variant="outline-success" value='prev' onClick={handlePageChange}>
          {'<-Prev'}
        </Button>
      }
      {page &&  // show numberPage if page received
      <Button variant="outline-success" disabled>
          {page}
        </Button>
      }
      { page < totalPages &&  // show next if count page less than total pages
        <Button variant="outline-success" value='next' onClick={handlePageChange}>
          {'Next->'}
        </Button>
      }
    </Col>
  </Row>
</Container>