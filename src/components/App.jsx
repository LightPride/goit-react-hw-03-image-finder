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
        await this.setState({ showBtn: false });
        Notiflix.Notify.failure("We're sorry, there are no matches found :(");
        throw new Error("We're sorry, there are no matches found :(");
      }
      if (data.hits.length < 12) {
        this.setState({ showBtn: false });
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        status: 'resolved',
        showBtn: showBtn,
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  handleFormSubmit = searchValue => {
    if (this.state.searchValue === searchValue) {
      return;
    }
    this.setState({ searchValue: searchValue, images: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit}></SearchBar>;
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
          <ImageGallery
            images={this.state.images}
            status={this.state.status}
            error={this.state.error}
          ></ImageGallery>
        )}
        {this.state.showBtn && <Button onClick={this.onLoadMore}></Button>}
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
