import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, Input, Button, Container } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateMovie () {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [imdbId, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const {movieId} = useParams();

  const history = useHistory();

  useEffect(() => {
    getMovieDetail();
    console.log("use effect called");
  }, []);

  function onClickUpdate () {
     console.log(movieId);
     let newTitle =  title;
     let newYear = year;
     let newPoster = poster;
     let newId = imdbId;
    //  console.log(`the new title is ${title}`);
    //  console.log(`the new year is ${year}`);
    //  console.log(`the new poster is ${poster}`);
    //  console.log(`the new imdbId is ${imdbId}`);
    if(title === '')
    {
        newTitle = data.title;
    }
    if(year === '')
    {
        newYear = data.year;
    }
    if(poster === '')
    {
        newPoster = data.poster;
    }
    if(imdbId === '')
    {
        newId = data.imdbId;
    }
    console.log(`the new title is ${newTitle}`);
    console.log(`the new year is ${newYear}`);
    console.log(`the new poster is ${newPoster}`);
    console.log(`the new imdbId is ${newId}`);
    axios
      .post(`http://localhost:5000/updateMovie`, {
        title : newTitle,
        year : newYear,
        poster : newPoster,
        imdbId : newId,
        movieId
      })
      .then(res => {
        console.log(res)
        console.log(res.data)
        alert('updated');
      })
    console.log("inside update");
  }

  function getMovieDetail() {
    console.log(`the imdbId is ${movieId}`);
    setLoading(true);
    fetch(`http://localhost:5000/getMovieById/${movieId}`)
      .then((response) => response.json())
      .then((result) => {
        const [movieDetail] = result;
        setLoading(false);
        setData(movieDetail);
        console.log(result);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  return (
      <Container>
          {loading ? (
        <h3>Loading...</h3>
      ) : (
          <>
    <section className='search-section'>
      <p>Enter the Movie Name</p>

      <Input
        defaultValue = {data.title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      ></Input>
      <br />
      <p>Enter the Year</p>
      <Input
        defaultValue = {data.year}
        onChange={e => {
          setYear(e.target.value)
        }}
      />
      <br />
      <p>Enter the imdbID</p>
      <Input
        defaultValue = {data.imdbId}
        onChange={e => {
          setId(e.target.value)
        }}
      />
      <br />
      <p>Enter the Poster Link</p>

      <Input
        defaultValue = {data.poster}
        onChange={e => {
          setPoster(e.target.value)
        }}
      />
      <br />
      <Button color='success' onClick={onClickUpdate}>
        Insert Data
      </Button>
      <Button
        type='button'
        className='btn btn-danger'
        onClick={() => history.goBack()}
      >
        Go Back
      </Button>
    </section>
    </>
      )}
    </Container>
  )
}