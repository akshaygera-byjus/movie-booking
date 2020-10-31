import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

const Example = (props) => {
    const [movieTitle, setMovieTitle] = useState("");
    const [movieYear, setMovieYear] = useState("");
    const [moviePoster, setMoviePoster] = useState("");
    const [movieId, setMovieYear] = useState("");
    
    const onSubmitData = () => {

    }
  return (
      <Container>
    <Form>
      <FormGroup>
        <Label for="movieTitle">Movie name</Label>
        <Input type="text" name="title" id="movieTitle" placeholder="Enter name of the movie" />
      </FormGroup>
      <FormGroup>
        <Label for="movieYear">Movie year</Label>
        <Input type="text" name="year" id="movieYear" placeholder="Enter year of release" />
      </FormGroup>
      <FormGroup>
        <Label for="movieId">Movie ID</Label>
        <Input type="text" name="imdbId" id="movieId" placeholder="Enter IMDB ID" />
      </FormGroup>
      <FormGroup>
        <Label for="moviePoster">Poster URL</Label>
        <Input type="text" name="poster" id="moviePoster" placeholder="Enter Poster URL" />
      </FormGroup>
      
      <Button onClick={onSubmitData}>Submit</Button>
    </Form>
    </Container>
  );
}

export default Example;