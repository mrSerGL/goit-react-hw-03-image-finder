import React, { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {};

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.form}>
            <input
              className={css.inpu}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />

            <button type="submit" className={css.button}>
              <span className={css.buttonlabel}>Search</span>
            </button>
          </form>
        </header>
      </>
    );
  }
}
export default Searchbar;
