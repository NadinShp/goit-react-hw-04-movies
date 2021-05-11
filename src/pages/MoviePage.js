import { Component } from 'react';
import ApiRequest from '../services/Api';
import queryString from 'query-string';
import MovieItem from '../components/MovieItem/MovieItem';
import PropTypes from 'prop-types';
import Container from '../components/Container/Container';
import SearchBar from '../components/SearchBar/SearchBar';

const { fetchMovieByWord } = ApiRequest;

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };
  componentDidMount = () => {
    // console.log();
    const queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    const { query } = queryParams;
    if (query) {
      fetchMovieByWord(query)
        .then(results => {
          this.setState({
            movies: results,
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  };
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    this.setState({ query: value });
  };
  handleSubmit = query => {
    const { history } = this.props;
    fetchMovieByWord(query)
      .then(results => {
        this.setState({
          movies: results,
        });
      })
      .then(
        history.push({
          pathname: this.props.location.pathname,
          search: `query=${query}`,
        }),
      );
  };
  render() {
    const { movies } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        <ul>
          {movies.length > 1 &&
            movies.map(movie => (
              <MovieItem
                key={movie.id}
                title={movie.original_title}
                movieId={movie.id}
                movieUrl={`${this.props.match.url}/${movie.id}`}
              />
            ))}
        </ul>
      </Container>
    );
  }
}
MoviesPage.defaultsProps = {
  query: '',
  movies: [],
};
MoviesPage.propTypes = {
  query: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      original_title: PropTypes.string,
    }),
  ),
};
export default MoviesPage;
