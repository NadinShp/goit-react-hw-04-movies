import 'modern-normalize/modern-normalize.css';
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviePage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
import routes from './routes';
import AppBar from './components/AppBar/AppBar';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./pages/HomePage' /*webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviePage' /*webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /*webpackChunkName: "movie-details-page" */
  ),
);

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={routes.home} exact component={HomePage} />
        <Route path={routes.movieDetail} component={MovieDetailsPage} />
        <Route path={routes.movies} component={MoviesPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
