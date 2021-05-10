import { Component } from 'react';
import ApiRequest from '../services/Api';
import { Link, Route, Switch } from 'react-router-dom';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import routes from '../routes';

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
      history.push(location.state.from);
    } else {
      history.push(routes.home);
    }
  };
  render() {
    const { match } = this.props;
    console.log(this.props.location.state.from);
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
      <div>
        <button type="button" onClick={this.handleGoBack}>
          Go back
        </button>
        <div>
          <img src={posterUrl} alt={title} />
          <h2>
            {title} ({release})
          </h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genresList}</p>
        </div>
        <div>
          <h5>Additional information</h5>
          <ul>
            <li>
              <Link to={`${match.url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${match.url}/reviews`}>Reviews</Link>
            </li>
          </ul>
          <Switch>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default MovieDetailsPage;
