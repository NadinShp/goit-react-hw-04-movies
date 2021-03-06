import { Component } from 'react';
import ApiRequest from '../../services/Api';
import styles from './Cast.module.css';
import PropTypes from 'prop-types';

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
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const posterPath = 'https://www.themoviedb.org/t/p/w240_and_h266_face';
    return (
      <>
        <ul className={styles.list}>
          {this.state.actors.map(actor => (
            <li key={actor.cast_id}>
              {actor.profile_path && (
                <img
                  src={`${posterPath}${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <h6 className={styles.name}>{actor.name}</h6>
              <p className={styles.description}>{actor.character}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
Cast.defaultProps = {
  actors: [],
};
Cast.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.number.isRequired,
      profile_path: PropTypes.string,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    }),
  ),
};
export default Cast;
