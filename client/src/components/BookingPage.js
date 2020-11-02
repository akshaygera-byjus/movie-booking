import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "reactstrap";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { imdbId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getMovieDetail();
    console.log("use effect called");
  }, []);

  function getMovieDetail() {
    console.log(imdbId);
    setLoading(true);
    fetch(`http://localhost:5000/getMovieById/${imdbId}`)
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

  function onClickBook() {
    alert("Ticket Booked");
  }

  return (
    <Container>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h2>{data.title}</h2>
          <h4>Year: {data.year}</h4>
          <p>
            <img src={data.poster} alt="img" className="img-thumbnail" />
          </p>
          <p></p>
          <p>{data.title}</p>
          <h5>IMDB ID: {data.imdbId}</h5>
          <h6>Year: {data.year}</h6>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClickBook}
          >
            Book Ticket
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>
        </>
      )}
    </Container>
  );
}
