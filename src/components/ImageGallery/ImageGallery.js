import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {};

  render() {
    console.log(this.props.firstPage);

    return (
      <>
        {this.props.firstPage.map(({ id, webformatURL, tags, largeImageURL }) => (
          <li className={css.galleryItem} key={id}>
            <img 
            onClick={() => this.props.onClickImage(largeImageURL)}
            src={webformatURL} 
            alt={tags}
            largeimage={largeImageURL} />
          </li>
        ))}
      </>
    );
  }
}

ImageGallery.propTypes = {
  onClickImage: PropTypes.func,
  firstPage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
