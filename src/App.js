import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Banner from './components/Banner';
import MovieDetails from './components/MovieDetails';
import Nav from './components/Nav';
import Row from './components/Row';
import requests from './helpers/requests'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Nav></Nav>
            <Banner selection={null}></Banner>
            <Row title="Netflix Originals"
              fetchUrl={requests.fetchNetflixOriginals}
              isLargeRow
            ></Row>
            <Row key={0} title="Trending Now" fetchUrl={requests.fetchTrending}></Row>
            <Row key={1} title="Top Rated" fetchUrl={requests.fetchTopRated}></Row>
            <Row key={2} title="Action Movies" fetchUrl={requests.fetchActionMovies}></Row>
            <Row key={3} title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}></Row>
            <Row key={4} title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}></Row>
            <Row key={5} title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}></Row>
            <Row key={6} title="Documentaries" fetchUrl={requests.fetchDocumentaries}></Row>
          </Route>

          <Route path="/movie/:id">
            <MovieDetails></MovieDetails>
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
