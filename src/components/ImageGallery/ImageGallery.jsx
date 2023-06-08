import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
    }
  }

  render() {
    return <Gallery></Gallery>;
  }
}
