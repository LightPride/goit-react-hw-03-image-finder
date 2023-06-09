import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import { getImages } from 'api';
import Notiflix from 'notiflix';

export default class ImageGallery extends Component {
  state = {
    images: null,
    status: 'idle',
    error: null,
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.fetchImages();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchMoreImages();
    }
  }

  fetchMoreImages = async () => {
    const { searchValue } = this.props;
    const { currentPage } = this.state;
    await this.setState({ status: 'pending2' });
    try {
      const data = await getImages({ searchValue, currentPage });

      if (data.hits.length > 0) {
        this.setState(prevState => ({
          images: {
            ...prevState.images,
            hits: [...(prevState.images?.hits || []), ...data.hits],
          },
          status: 'resolved',
        }));
      } else if (data.hits.length < 12) {
        console.log(data.hits);
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  fetchImages = async () => {
    const { searchValue } = this.props;
    const currentPage = 1;
    await this.setState({ status: 'pending' });
    try {
      const data = await getImages({ searchValue, currentPage });

      if (data.hits.length > 0) {
        this.setState({ images: data, status: 'resolved' });
      } else if (data.hits.length === 0) {
        Notiflix.Notify.failure("We're sorry, there are no matches found :(");
        throw new Error("We're sorry, there are no matches found :(");
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    return (
      <>
        {this.state.status === 'pending' && <Loader></Loader>}
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
            {this.state.status === 'pending2' && <Loader></Loader>}
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
