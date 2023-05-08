import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import GalleryService from '../../services/GalleryService';
import css from './Searchbar.module.css';

// const galleryService = new GalleryService();

class Searchbar extends Component {
  state = {
    name: '',
    firstPage: [],
  };

  onChangeInputDebounced = debounce(event => {
    const inputValue = event.target.value.trim();
    console.log('inputValue:',inputValue)
    if (inputValue.length === 0) {
      alert('enter name');
      return;
    }
    this.setState({ name: inputValue });
    this.props.getName(inputValue);
  }, 250);

 async getImages(event) {
    event.preventDefault();
    console.log('click on button');
    console.log(this.state.name);

    const galleryService = new GalleryService();
    galleryService.name = this.state.name;

    try {
      await galleryService.getImages().then(response => {
        console.log(response.hits);
        this.setState({ firstPage: response.hits });
        console.log(this.state.firstPage);
      });
    } catch (error) {
      console.log('getImages say:', error.message);
    }
  }

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.getImages}>
            <button
              type="submit"
              className={css.button}
              onClick={this.props.onClick}
            >
              <span className={css.buttonlabel}>Search</span>
            </button>

            <input
              className={css.inpu}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.onChangeInputDebounced}
            />
          </form>
        </header>
      </>
    );
  }
}
export default Searchbar;
