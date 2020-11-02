import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import SearchSection from "./components/SearchSection";

export default function App() {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState(false);

  function onChangeSearchValue(event) {
    const searchValue = event.target.value;

    setSearchValue(searchValue);
    //console.log(`search value is ${searchValue}`)
  }

  function toggle(){
    setModal(!modal);
  }

  function confirmDelete(imdbId){
    
    console.log("inside confirm delete");
    console.log(`deleteId is ${imdbId}`);
    const deleteRecord = {"imdbId":imdbId};
    axios.delete(`http://localhost:5000/deleteMovie/`,{data:deleteRecord})
       .then((response) => console.log(response))
       .catch((error) => console.log("error", error));
    setModal(!modal);
  }

  function onKeyPressSearchValue(event) {
    if (event.charCode === 13) {
      fetchMovies();
    }
  }

  function onClickSearch() {
    fetchMovies();
  }

  function fetchMovies() {
    fetch(`http://localhost:5000/getMovies/${searchValue}`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }
  function onClick4Booking(imdbID) {}

  return (
    <Container style={{ marginTop: "60px" }}>
      <SearchSection
        onChangeSearchValue={onChangeSearchValue}
        onKeyPressSearchValue={onKeyPressSearchValue}
        onClickSearch={onClickSearch}
      />
      <br />
      <section className="movies-section">
        <Row>
          {data && data.length &&
            data.map((movie) => {
              return (
                <Col md={3} key={movie.imdbId}>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={movie.poster}
                      alt="Card image cap"
                    />
                    <CardBody className="bg-secondary">
                      <CardTitle>{movie.title}</CardTitle>
                      <CardText>
                        {movie.year}-{movie.type}
                      </CardText>
                      <Link
                        to={`/booking-page/${movie.imdbId}`}
                        className="btn btn-primary"
                      >
                        Book Now
                      </Link>
                      <Link
                        to={`/update-page/${movie.imdbId}`}
                        className="btn btn-success"
                      >
                        Update
                      </Link>
                      <div>
                        <Button color="danger" onClick={toggle}>Delete</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
                        <ModalBody>
                          Are you sure you want to delete?
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={() => confirmDelete(movie.imdbId)}>Confirm</Button>{' '}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </section>
    </Container>
  );
}
