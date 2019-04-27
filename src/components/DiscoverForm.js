import React, { useState, useEffect } from 'react';
import { Form, Col, Container } from 'react-bootstrap';
import history from '../history';

export default () => {
  const [form, setForm] = useState({
    type: 'movie',
    year: 2018,
    sort_by: 'popularity.desc',
    with_genres: '',
  });

  const handleChange = (e, key) => {
    e.preventDefault();
    setForm({ ...form, [key]: e.target.value });
  };
  useEffect(() => {
    const link = `/discover/${form.type || ''}?${
      form.type === 'movie' ? 'year' : 'first_air_date_year'
    }=${form.year || ''}&sort_by=${form.sort_by ||
      ''}&with_genres=${form.with_genres || ''}`;
    history.push(link);
  }, [form]);

  const yearsArr = [];
  for (let i = 2019; i > 1900; i--) {
    yearsArr.push(i);
  }

  return (
    <Container>
      <Form className="mt-4">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={form.type}
              onChange={e => handleChange(e, 'type')}
            >
              <option value="movie">Movie</option>
              <option value="tv">Tv</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Year</Form.Label>
            <Form.Control
              as="select"
              value={form.year}
              onChange={e => handleChange(e, 'year')}
            >
              {yearsArr.map((elem, i) =>
                elem === 2018 ? (
                  <option key={i} value={elem}>
                    {elem}
                  </option>
                ) : (
                  <option key={i} value={elem}>
                    {elem}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Sort By</Form.Label>
            <Form.Control
              as="select"
              value={form.sort_by}
              onChange={e => handleChange(e, 'sort_by')}
            >
              <option value="popularity.desc">Popularity Descending</option>
              <option value="popularity.asc">Popularity Ascending</option>
              <option value="vote_average.desc">Rating Descending</option>
              <option value="vote_average.asc">Rating Ascending</option>
              <option value="primary_release_date.desc">
                Release Date Descending
              </option>
              <option value="primary_release_date.asc">
                Release Date Ascending
              </option>
              <option value="title.asc">Title (A-Z)</option>
              <option value="title.desc">Title (Z-A)</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Genres</Form.Label>
            <Form.Control
              as="select"
              value={form.with_genres}
              onChange={e => handleChange(e, 'with_genres')}
            >
              <option value="" disabled>
                Filter by genres...
              </option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="10770">TV Movie</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  );
};
