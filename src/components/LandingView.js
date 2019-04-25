import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Spinner, CardGroup }  from 'react-bootstrap'
import { config } from '../config';
import { fetchData } from '../actions/fetch';
import history from '../history';



const CardMy = ({id, vote_average, first_air_date, release_date, backdrop_path, poster_path, title, original_title, name, overview, descriptionQuantity}) =>{
  let idOfUser = id;
  let tvOrMovie = first_air_date? 'tv': 'movie';
  const handleClick = (e) => {
    history.push(`/${tvOrMovie}/${idOfUser}`)
  }

  let nameOfMovie = original_title || title || name;

  return <Card className="text-white border-0 mouse-pointer" onClick={handleClick}>
		  <Card.Img src={config.imgLink+backdrop_path} alt="Card image" className='rounded-0'/>
		  <Card.ImgOverlay className='d-flex'>
		    <Card.Title className='align-self-end' style={{textShadow: '1px 1px 0 #000', fontFamily: 'sans-serif'}}>{nameOfMovie}</Card.Title>
		  </Card.ImgOverlay>
		</Card>
}

const CardPeople = ({profile_path, name, known_for, id}) =>{
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

const Landing = ({json, fetchAditional, resultsJsonReset, loadingCount})=>{

	useEffect(()=>{
		let aditionalJsonMovie = {
			path:'/movie/upcoming',
			nameJson:'movieJson',
		}
		let aditionalJsonTv = {
			path:'/tv/on_the_air',
			nameJson:'tvJson',
		}
		let aditionalJsonPersons = {
			path:'/person/popular',
			nameJson:'personJson',
		}
		// resultsJsonReset();
		fetchAditional(aditionalJsonMovie);
		fetchAditional(aditionalJsonTv);
		fetchAditional(aditionalJsonPersons);
	},[loadingCount]);

	if(!json || !json.movieJson || !json.tvJson || !json.personJson){ // loading while fetching
		return <Row  className='justify-content-center m-5'>
			<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner></Row>
	}
	let resultsMovie = json.movieJson.results;
	let resultsTv = json.tvJson.results;
	let resultsPerson = json.personJson.results;
	// console.log(resultsMovie);
	// console.log(resultsTv);
	// console.log(resultsPerson);


	return <Container className='main mt-3'>
		<Row className='my-3'>
			<Col md={6} className='mt-3'>
				<Row>
					<Col sm={12}>
            <Link to='/tv/on_the_air' className='nav nav-link h2 text-black'>On TV</Link>
					</Col>
					{resultsTv.map((item,i)=>
						i>2? '':
		        <Col className='m-0 p-0' sm={i===0? 12 : 6} key={i}>
		          <CardMy 
		            {...item} 
		          />
		        </Col>
		        )
					}
				</Row>
			</Col>
			<Col md={6}  className='mt-3'>
				<Row >
					<Col sm={12}>
						<Link to='/movie/upcoming' className='nav nav-link h2 text-black'>In Theaters</Link>
					</Col>
					{resultsMovie.map((item,i)=>
						i>2? '':
		        <Col className='m-0 p-0' sm={i===0? 12 : 6} key={i}>
		          <CardMy 
		            {...item} 
		          />
		        </Col>
		        )
					}
				</Row>
			</Col>
		</Row>

		<Row className='my-5'>
			<Col sm={12}>
        <Link to='/person/popular' className='nav nav-link h2 text-black'>Most popular persons</Link>
			</Col>
			<CardGroup>
			{resultsPerson.map((item,i)=>
				i>11? '':
        <Col className='col-lg-2 col-md-3 col-sm-4 col-xs-6 m-0 my-3 p-0' key={i}>
          <CardPeople {...item} />
        </Col>)
			}
			</CardGroup>
		</Row>

	</Container>
}

const mapStateToProps = (state) => {
  return {
    json: state.json,
    loadingCount: state.state.loadingCount,
  };
};

const mapDispatchToProps = (dispatch) =>{
	return {
		fetchAditional: params => dispatch(fetchData(params)),
		resultsJsonReset: () => dispatch({type:'RESET_RESULTS_IN_STORE'}),
	};
};
// export default Landing;
export default connect(mapStateToProps, mapDispatchToProps)(Landing);