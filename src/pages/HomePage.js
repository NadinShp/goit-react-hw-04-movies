import { Component } from 'react';
import ApiRequest from '../services/Api';
import MovieItem from '../components/MovieItem/MovieItem';
import Container from '../components/Container/Container';

const { fetchPopularMovies } = ApiRequest;

class HomePage extends Component {
  state = {
    popularMovies: [],
  };
  async componentDidMount() {
    try {
      const results = await fetchPopularMovies();
      console.log(results);
      this.setState({ popularMovies: results });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { popularMovies } = this.state;
    return (
      <>
        <Container>
          <h1>Trending today</h1>
          <ul>
            {popularMovies.map(movie => (
              <MovieItem
                key={movie.id}
                title={movie.original_title}
                movieId={movie.id}
              />
            ))}
          </ul>
        </Container>
      </>
    );
  }
}
export default HomePage;
