import React, { Component } from 'react';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {};

  render() {
    console.log(this.props.firstPage);
    return (
      <>
        {this.props.firstPage.map(item => (
          <li className={css.galleryItem} key={item.id}>
            <img src={item.previewURL} alt="" />
          </li>
        ))}
      </>
    );
  }
}

export default ImageGallery;
