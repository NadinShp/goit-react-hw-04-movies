import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import styles from './AppBar.module.css';

const AppBar = () => (
  <header className={styles.header}>
    <Container>
      <Navigation />
    </Container>
  </header>
);
export default AppBar;
