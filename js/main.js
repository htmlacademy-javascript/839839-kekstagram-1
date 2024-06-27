import {renderingThumbnails} from './rendering-pictures.js';
import {addEventListenerThumbnail} from './big-picture.js';
import {addEventUploadForm} from './form.js';
import {addEventListenerButton} from'./scale.js';
import {addEventListenerEffects} from './effect.js';
import {showAlert} from './util.js';
import {getData} from './api.js';

try {
  const publicationsData = await getData();
  renderingThumbnails(publicationsData);
  addEventListenerThumbnail(publicationsData);
} catch (err){
  showAlert(err.message);
}

addEventUploadForm();

addEventListenerButton();
addEventListenerEffects();
