import { Component } from 'react';
import ApiRequest from '../../services/Api';
import styles from './Reviews.module.css';
import PropTypes from 'prop-types';

const { fetchReviews } = ApiRequest;

class Reviews extends Component {
  state = {
    authors: [],
  };
  async componentDidMount() {
    try {
      const { moviesId } = this.props.match.params;
      const results = await fetchReviews(moviesId);
      this.setState({
        authors: results,
      });
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { authors } = this.state;
    return authors.length > 0 ? (
      <ul className={styles.list__author}>
        {authors.map(({ author, content, id }) => (
          <li key={id}>
            <h6 className={styles.author}>Author: {author}</h6>
            <p> {content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p> We don't have any reviews for this movie.</p>
    );
  }
}
Reviews.defaultProps = {
  authors: [],
};
Reviews.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      content: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};
export default Reviews;
