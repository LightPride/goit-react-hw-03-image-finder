import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '35698435-4c63849f1d133deb699669e72';

export default class ImageGallery extends Component {
  state = {
    images: null,
    status: 'idle',
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      fetch(
        `${BASE_URL}?q=${this.props.searchValue}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error('oops... something went wrong...'));
        })
        .then(images => {
          if (images.hits.length > 0) {
            this.setState({ images: images, status: 'resolved' });
          } else if (images.hits.length === 0) {
            throw new Error(
              "We're sorry, there are no pictures for your search :("
            );
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  onLoadMore = () => {
    this.state.page += 1;
    console.log(this.state.page);
  };

  render() {
    return (
      <>
        {this.state.status === 'idle' && (
          <h2
            style={{
              textAlign: 'center',
              marginTop: '50px',
            }}
          >
            Lets find some pictures!
          </h2>
        )}
        {this.state.status === 'resolved' && (
          <>
            <Gallery>
              {this.state.images.hits.map(
                ({ id, webformatURL, largeImageURL }) => {
                  return (
                    <ImageGalleryItem
                      key={id}
                      webImage={webformatURL}
                    ></ImageGalleryItem>
                  );
                }
              )}
            </Gallery>
            <Button onClick={this.onLoadMore}></Button>
          </>
        )}

        {this.state.status === 'rejected' && (
          <h1
            style={{
              textAlign: 'center',
              marginTop: '50px',
            }}
          >
            {this.state.error.message}
          </h1>
        )}
      </>
    );
  }
}
