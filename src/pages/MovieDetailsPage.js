import { Component } from 'react';
import ApiRequest from '../services/Api';
import { Link, Route, Switch } from 'react-router-dom';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import routes from '../routes';
import styles from './styles/MovieDetails.module.css';
import Container from '../components/Container/Container';
import PropTypes from 'prop-types';
const { fetchMovieById } = ApiRequest;

class MovieDetailsPage extends Component {
  state = {
    title: null,
    posterUrl: null,
    release: null,
    userScore: null,
    overview: null,
    genres: [],
    id: null,
  };
  async componentDidMount() {
    try {
      const { moviesId } = this.props.match.params;
      const { data } = await fetchMovieById(moviesId);
      const posterPath = 'https://www.themoviedb.org/t/p/w300';
      this.setState({
        title: data.original_title,
        posterUrl: `${posterPath}${data.poster_path}`,
        release: parseInt(data.release_date),
        userScore: (data.vote_average / 10) * 100,
        overview: data.overview,
        genres: data.genres.map(genre => genre.name),
        id: data.id,
      });
      const a = data.genres.map(genre => genre.name);
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  }
  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    if (!location.state) {
      return history.push(routes.home);
    }
  };
  render() {
    const { match } = this.props;
    const {
      title,
      posterUrl,
      release,
      userScore,
      overview,
      genres,
    } = this.state;
    const genresList = genres.join(', ');
    return (
      <Container>
        <div className={styles.wrap}>
          <button type="button" onClick={this.handleGoBack}>
            Go back
          </button>
          <div className={styles.details__wrap}>
            {!!posterUrl && (
              <img src={posterUrl} alt={title} className={styles.img} />
            )}
            <div>
              <h2>
                {title} ({release})
              </h2>
              <p>User Score: {userScore}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h4>Genres</h4>
              <p>{genresList}</p>
            </div>
          </div>
          <div className={styles.wrap}>
            <h5 className={styles.addInfo}>Additional information</h5>
            <ul className={styles.listInfo}>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/cast`,
                    state: this.props.location.state,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: this.props.location.state,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Switch>
              <Route path={`${match.path}/cast`} component={Cast} />
              <Route path={`${match.path}/reviews`} component={Reviews} />
            </Switch>
          </div>
        </div>
      </Container>
    );
  }
}
MovieDetailsPage.defaultProps = {
  title: null,
  posterUrl: null,
  release: null,
  userScore: null,
  overview: null,
  genres: [],
  id: null,
};
MovieDetailsPage.propTypes = {
  title: PropTypes.string,
  posterUrl: PropTypes.string,
  release: PropTypes.number,
  userScore: PropTypes.number,
  overview: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number,
};
export default MovieDetailsPage;
