import {getData} from './api.js';
import {renderMiniatures} from './miniature.js';
import {showAlert} from './util.js';
import './full-size-picture.js';
import './form.js';
import './edit-img.js';


getData()
  .then((images) => {
    renderMiniatures(images);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

