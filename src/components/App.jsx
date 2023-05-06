import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import css from './App.module.css';

export const App = () => {
  return (
    <div>
      <Searchbar/>
      <ul  className={css.App}>
      <ImageGallery/>
      </ul>
    </div>
  );
};
