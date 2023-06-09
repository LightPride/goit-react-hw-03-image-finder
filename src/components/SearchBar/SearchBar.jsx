import { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export default class SearchBar extends Component {
  state = {
    searchInput: '',
  };

  handleNameChange = event => {
    this.setState({ searchInput: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchInput.trim() === '') {
      alert('Search querry should not be empty!');
      return;
    }
    this.props.onSubmit(this.state.searchInput);
    this.setState({ searchInput: '' });
  };

  render() {
    return (
      <Header onSubmit={this.handleSubmit}>
        <SearchForm>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchInput}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
