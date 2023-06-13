import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    modalImageURL: '',
  };
  toggleModal = modalImageURL => {
    this.setState({ showModal: !this.state.showModal, modalImageURL });
  };
  render() {
    const { images } = this.props;
    return (
      <>
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                toggleModal={this.toggleModal}
                key={id}
                webImage={webformatURL}
                largeImage={largeImageURL}
              ></ImageGalleryItem>
            );
          })}
        </Gallery>
        {this.state.showModal && (
          <Modal
            largeImage={this.state.modalImageURL}
            handleModalClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
