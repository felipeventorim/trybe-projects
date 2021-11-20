import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  MovieList,
  MovieDetails,
  NewMovie,
  EditMovie,
  NotFound,
} from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="movie-card-header">
        <h1 className="page-title">Movie Card Library - CRUD</h1>
      </div>
      <Switch>
        <Route exact path="/" component={ MovieList } />
        <Route path="/movies/new" component={ NewMovie } />
        <Route exact path="/movies/:id" component={ MovieDetails } />
        <Route path="/movies/:id/edit" component={ EditMovie } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
