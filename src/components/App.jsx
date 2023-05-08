import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import GalleryService from '../services/GalleryService';
import ImageGallery from './ImageGallery';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    firstPage: [],
  };

  onSubmit = async searchQuery => {
    this.setState({ searchQuery: searchQuery });

    if (searchQuery === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }

    const galleryService = new GalleryService();
    galleryService.name = searchQuery;

    try {
      await galleryService.getImages().then(response => {
        console.log(response.hits);
        this.setState({ firstPage: response.hits });
      });
    } catch (error) {
      console.log('getImages say:', error.message);
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ul className={css.App}>
          <ImageGallery firstPage={this.state.firstPage} />
        </ul>
      </div>
    );
  }
}
