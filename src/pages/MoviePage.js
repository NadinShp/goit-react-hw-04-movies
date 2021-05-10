import { Component } from 'react';
import ApiRequest from '../services/Api';
import { Link, Route } from 'react-router-dom';
import MovieItem from '../components/MovieItem/MovieItem';
import MovieList from '../components/MovieList/MovieList';

const { fetchMovieByWord } = ApiRequest;

class MoviesPage extends Component {
  state = {
    searchValue: '',
    searchingMovies: [],
  };
  handleInputValue = e => {
    const { value } = e.currentTarget;
    this.setState({
      searchValue: value,
    });
  };
  handleCleanValue() {
    this.setState({
      searchValue: '',
    });
  }
  handleRequestMovie = async e => {
    e.preventDefault();
    try {
      const { searchValue } = this.state;
      const results = await fetchMovieByWord(searchValue);
      this.setState({ searchingMovies: results });
      this.handleCleanValue();
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { searchValue, searchingMovies } = this.state;
    return (
      <>
        <form>
          <input
            type="text"
            value={searchValue}
            onChange={this.handleInputValue}
            autocomplite="off"
            autoFocus
          />
          <button type="submit" onClick={this.handleRequestMovie}>
            <Link to={`${this.props.match.url}?query=${searchValue}`}>
              Search
            </Link>
          </button>
        </form>
        <Route
          path={`${this.props.match.path}?query=${searchValue}`}
          render={props => (
            <MovieList {...props} searchWord={this.searchValue} />
          )}
        />
        <ul>
          {searchingMovies.map(movie => (
            <MovieItem
              key={movie.id}
              title={movie.original_title}
              movieId={movie.id}
              movieUrl={`${this.props.match.url}/${movie.id}`}
            />
          ))}
        </ul>
      </>
    );
  }
}
export default MoviesPage;
