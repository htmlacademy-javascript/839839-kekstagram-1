import {getPhotos} from './mocks/data.js';
import {PHOTO_COUNT} from './mocks/data-generation.js';
import {renderingThumbnails} from './rendering-pictures.js';
import {addEventListenerThumbnail} from './big-picture.js';
import {isEventUploadForm} from './form.js';

const publicationsData = getPhotos(PHOTO_COUNT);
renderingThumbnails(publicationsData);

addEventListenerThumbnail(publicationsData);

isEventUploadForm();
