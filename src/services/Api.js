import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = 'ba488534326958315212a4a976da6afc';

const ApiRequest = {
  fetchPopularMovies() {
    return axios
      .get(`${BASE_URL}/trending/movie/day?api_key=${KEY}`)
      .then(response => response.data.results);
  },
  fetchMovieByWord(word) {
    return axios
      .get(
        `${BASE_URL}/search/movie?api_key=${KEY}&query=${word}&language=en-US&page=1`,
      )
      .then(response => response.data.results);
  },
  fetchMovieById(movieId) {
    return axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`,
    );
    //   .then(response => response.data.data);
  },
  fetchMovieCast(movieId) {
    return axios
      .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`)
      .then(response => response.data);
  },
  fetchReviews(movieId) {
    return axios
      .get(
        `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
      )
      .then(response => response.data.results);
  },
};
export default ApiRequest;
// .then(response => response.data.results);
