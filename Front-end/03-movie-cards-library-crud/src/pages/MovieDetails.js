import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      movie: {},
    };

    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const data = await movieAPI.getMovie(id);
    this.setState(
      {
        loading: false,
        movie: data,
      },
    );
  }

  delete() {
    const { match: { params } } = this.props;
    const { id } = params;
    movieAPI.deleteMovie(id);
  }

  render() {
    const { movie, loading } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;

    if (loading) return <Loading />;

    return (
      <div className="movie-details" data-testid="movie-details">
        <img alt="Movie Cover" className="movie-card-image" src={ `../${imagePath}` } />
        <div className="movie-card-body">
          <h4 className="movie-card-title">{title}</h4>
          <h5 className="movie-card-subtitle">{subtitle}</h5>
          <p className="movie-card-storyline">{storyline}</p>
          <p>{ `Genre: ${genre}` }</p>
        </div>
        <div className="movie-card-rating">
          <span className="rating">{rating}</span>
        </div>
        <Link className="link" to="/">VOLTAR</Link>
        <Link className="link" to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link className="link" to="/" onClick={ this.delete }>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
