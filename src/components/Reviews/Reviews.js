import { Component } from 'react';
import ApiRequest from '../../services/Api';

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
      <ul>
        {authors.map(({ author, content, id }) => (
          <li key={id}>
            <h6>Author: {author}</h6>
            <p> {content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p> We don't have any reviews for this movie.</p>
    );
  }
}

export default Reviews;
