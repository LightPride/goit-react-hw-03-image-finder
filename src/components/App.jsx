import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    searchValue: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit}></SearchBar>;
        <ImageGallery searchValue={this.state.searchValue}></ImageGallery>;
      </>
    );
  }
}
