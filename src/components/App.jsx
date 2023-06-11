import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getImages } from 'api';
import Notiflix from 'notiflix';
import Button from 'components/Button/Button';

export default class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
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
    await this.setState({ status: 'pending' });

    try {
      const data = await getImages({ nextQuery, nextPage });
      if (data.hits.length === 0) {
        Notiflix.Notify.failure("We're sorry, there are no matches found :(");
        throw new Error("We're sorry, there are no matches found :(");
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
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
        <ImageGallery
          images={this.state.images}
          status={this.state.status}
          error={this.state.error}
        ></ImageGallery>
        ;<Button onClick={this.onLoadMore}></Button>
      </>
    );
  }
}
