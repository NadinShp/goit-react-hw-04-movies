import { Component } from 'react';
import ApiRequest from '../../services/Api';

const { fetchMovieCast } = ApiRequest;

class Cast extends Component {
  state = {
    actors: [],
  };
  async componentDidMount() {
    try {
      const { moviesId } = this.props.match.params;
      const { cast } = await fetchMovieCast(moviesId);
      this.setState({
        actors: cast,
      });
      console.log(cast);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const posterPath = 'https://www.themoviedb.org/t/p/w240_and_h266_face';
    return (
      <>
        <ul>
          {this.state.actors.map(actor => (
            <li key={actor.cast_id}>
              <img
                src={`${posterPath}${actor.profile_path}`}
                alt={actor.name}
              />
              <h6>{actor.name}</h6>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
export default Cast;
