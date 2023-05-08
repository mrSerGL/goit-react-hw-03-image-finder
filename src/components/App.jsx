import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
// import GalleryService from '../services/GalleryService';
import css from './App.module.css';

export default class App extends Component {
  state = {
    name: '',
    firstPage: [],
  };

  getName = name => {
    this.setState({ name: name });
  };

  getPictures = images => {
    this.setState({ firstPage: images });
  };

  // async getImages(event) {
  //   event.preventDefault();
  //   // console.log('click on button');
  //   // console.log(this.state.name);

  //   const galleryService = new GalleryService();
  //   galleryService.name = this.state.name;

  //   try {
  //     await galleryService.getImages().then(response => {
  //       console.log(response.hits);
  //       this.setState({ firstPage: response.hits });

  //       console.log(this.state.firstPage);
  //     });
  //   } catch (error) {
  //     console.log('getImages say:', error.message);
  //   }
  // }

  render() {
    return (
      <div>
        {/* <Searchbar getName={this.getName} onClick={this.getImages.bind()} /> */}
        <Searchbar getName={this.getName} getPictures={this. getPictures}/>

        <ul className={css.App}>
          <ImageGallery name={this.state.name} />
        </ul>

      </div>
    );
  }
}
