import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import Notiflix from 'notiflix';
import {
  Header,
  SearchForm,
  SearchFormButton,
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
      Notiflix.Notify.warning('Search querry should not be empty!');
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
            <FaSearch />
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
