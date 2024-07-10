import {renderingThumbnails} from './rendering-pictures.js';
import {addEventListenerThumbnail} from './big-picture.js';
import {addEventUploadForm} from './form.js';
import {addEventListenerButton} from'./scale.js';
import {addEventListenerEffects} from './effect.js';
import {showAlert, debounce} from './util.js';
import {getData} from './api.js';
import {showFilter} from'./filter.js';

try {
  const publicationsData = await getData();
  const debouncedRenderPictures = debounce(renderingThumbnails);
  renderingThumbnails(publicationsData);
  addEventListenerThumbnail(publicationsData);
  showFilter(publicationsData, debouncedRenderPictures);
} catch (err){
  showAlert(err.message);
}

addEventUploadForm();

addEventListenerButton();
addEventListenerEffects();
