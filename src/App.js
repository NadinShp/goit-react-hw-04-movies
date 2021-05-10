import 'modern-normalize/modern-normalize.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import routes from './routes';
import AppBar from './components/AppBar/AppBar';

const App = () => (
  <>
    <AppBar />
    <Switch>
      <Route path={routes.home} exact component={HomePage} />
      <Route path={routes.movieDetail} component={MovieDetailsPage} />
      <Route path={routes.movies} component={MoviesPage} />
    </Switch>
  </>
);

export default App;
