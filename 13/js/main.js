import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {renderMiniatures, showBlockFilters, setDefaultFilter, setRandomFilter, setDiscussedFilter, sortLikes} from './miniature.js';
import './full-size-picture.js';
import './form.js';
import './edit-img.js';

const RANDOM_ARRAY_POSTS_LENGTH = 10;

getData()
  .then((images) => {
    renderMiniatures(images);
    showBlockFilters();
    const debouncedFunc = debounce(renderMiniatures);
    setDefaultFilter(() => (debouncedFunc(images)));
    setRandomFilter(() => (debouncedFunc(images.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_ARRAY_POSTS_LENGTH))));
    setDiscussedFilter(() => debouncedFunc(images.slice().sort(sortLikes)));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

