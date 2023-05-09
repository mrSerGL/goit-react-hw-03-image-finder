import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import GalleryService from '../services/GalleryService';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    firstPage: [],
    page: 1,
    isLoading: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
  };

  onSubmit = async searchQuery => {
    if (searchQuery === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }

    this.setState({ searchQuery: searchQuery });
    this.setState({ isLoading: true });

    const galleryService = new GalleryService();
    galleryService.name = searchQuery;

    try {
      await galleryService.getImages(this.state.searchQuery).then(response => {
        this.setState({ firstPage: response.hits });
        this.setState({ isLoading: false });
        if (response.hits.length < 12) {
          this.setState({ showBtn: false });
        }
        if (response.hits.length === 12) {
          this.setState({ showBtn: true });
        }
        if (response.hits.length === 0) {
          Notiflix.Notify.failure('No matches found!');
        }

      });
    } catch (error) {
      console.log('onSubmit say:', error.message);
    }
  };

  onNextPage = () => {
    const nextPage = this.state.page + 1;
    this.setState({
      page: nextPage,
      isLoading: true,
    });

    const galleryService = new GalleryService();
    galleryService.name = this.state.searchQuery;
    galleryService.page = nextPage;

    try {
      galleryService.getImages().then(response => {
        const newImages = response.hits;
        this.setState(prevState => ({
          firstPage: [...prevState.firstPage, ...newImages],
          isLoading: false,
        }));
      });
    } catch (error) {
      console.log('onNextPage say:', error.message);
    }
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        <ul className={css.App}>
          <ImageGallery firstPage={this.state.firstPage} onClickImage={this.onClickImage}/>
        </ul>
        {this.state.isLoading && <Loader />}
        {/* <Button onNextPage={this.onNextPage} /> */}
        {this.state.showBtn && <Button onNextPage={this.onNextPage} />}
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onModalClose={this.onModalClose}
            />
        )}
        
      </div>
    );
  }
}
