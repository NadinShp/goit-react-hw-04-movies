import { Link, withRouter } from 'react-router-dom';
import styles from './MovieItem.module.css';
import PropTypes from 'prop-types';

const MovieItem = ({ title, movieId, location }) => (
  <>
    <li className={styles.homeItem}>
      <Link
        className={styles.homeLink}
        to={{
          pathname: `/movies/${movieId}`,
          state: { from: location },
        }}
      >
        {title}
      </Link>
    </li>
  </>
);
MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
};
export default withRouter(MovieItem);
