import { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      query: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          autocomplite="off"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
SearchBar.defaultProps = {
  querSearchBary: '',
};
SearchBar.propTypes = {
  querSearchBary: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;
