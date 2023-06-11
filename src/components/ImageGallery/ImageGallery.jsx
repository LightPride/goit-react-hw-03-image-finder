import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import Loader from 'components/Loader/Loader';

export default class ImageGallery extends Component {
  render() {
    const { images, status, error } = this.props;
    return (
      <>
        {status === 'pending' && <Loader></Loader>}
        {status === 'idle' && (
          <h2
            style={{
              textAlign: 'center',
              marginTop: '50px',
            }}
          >
            Lets find some pictures!
          </h2>
        )}
        {status === 'resolved' && (
          <>
            <Gallery>
              {images.hits.map(({ id, webformatURL, largeImageURL }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    webImage={webformatURL}
                  ></ImageGalleryItem>
                );
              })}
            </Gallery>
          </>
        )}

        {status === 'rejected' && (
          <h1
            style={{
              textAlign: 'center',
              marginTop: '50px',
            }}
          >
            {error.message}
          </h1>
        )}
      </>
    );
  }
}
