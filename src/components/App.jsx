import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit}></SearchBar>;
        <ImageGallery imageName={this.state.imageName}></ImageGallery>;
      </>
    );
  }
}
