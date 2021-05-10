import { Link, withRouter } from 'react-router-dom';
import styles from './MovieItem.module.css';

const MovieItem = ({ title, movieId, location }) => (
  <>
    <li className={styles.homeItem}>
      <Link
        className={styles.homeLink}
        to={{
          pathname: `/movies/${movieId}`,
          state: {
            from: location,
          },
        }}
      >
        {title}
      </Link>
    </li>
  </>
);
export default withRouter(MovieItem);
