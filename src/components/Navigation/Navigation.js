import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <ul className={styles.navigation}>
      <li>
        <NavLink
          exact
          to={routes.home}
          className={styles.navLink}
          activeClassName={styles.navLink__active}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={routes.movies}
          className={styles.navLink}
          activeClassName={styles.navLink__active}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);
export default Navigation;
