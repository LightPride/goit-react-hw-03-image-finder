import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getImages } from 'api';
import Notiflix from 'notiflix';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
export default class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchValue;
    const nextQuery = this.state.searchValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchImages(nextQuery, nextPage);
    }
  }

  fetchImages = async (nextQuery, nextPage) => {
    try {
      if (this.state.images.length === 0) {
        await this.setState({ status: 'pending' });
      }
      const data = await getImages({ nextQuery, nextPage });
      const showBtn = nextPage < Math.ceil(data.totalHits / 12);
      if (data.hits.length === 0) {
        this.setState({ showBtn });
        Notiflix.Notify.failure("We're sorry, there are no matches found :(");
        throw new Error("We're sorry, there are no matches found :(");
      }
      if (data.hits.length < 12) {
        this.setState({ showBtn });
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      const getNormalizedHits = hits =>
        hits.map(({ id, largeImageURL, webformatURL, tags }) => {
          return { id, largeImageURL, webformatURL, tags };
        });
      this.setState(prevState => ({
        images: [...prevState.images, ...getNormalizedHits(data.hits)],
        status: 'resolved',
        showBtn,
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  handleFormSubmit = searchValue => {
    if (this.state.searchValue === searchValue) {
      return;
    }
    this.setState({
      showBtn: false,
      status: 'pending',
      searchValue: searchValue,
      images: [],
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
      showBtn: false,
    }));
  };

  render() {
    const { status, showBtn, error, images } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit}></SearchBar>
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
        {(status === 'resolved' || status === 'pending') && (
          <ImageGallery images={images}></ImageGallery>
        )}
        {status === 'pending' && <Loader></Loader>}
        {showBtn && <Button onClick={this.onLoadMore}></Button>}
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
