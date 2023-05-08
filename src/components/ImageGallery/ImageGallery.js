import React, { Component } from 'react';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {};

  render() {
    return (
      <>
        <li className={css.galleryItem}>
          <img src="" alt="" />
        </li>
      </>
    );
  }
}
export default ImageGallery;
