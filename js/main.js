import {getPhotos} from './mocks/data.js';
import {PHOTO_COUNT} from './mocks/data-generation.js';
import {renderingThumbnails} from './rendering-pictures.js';
import {isEventBigPicture} from './big-picture.js';

const publicationsData = getPhotos(PHOTO_COUNT);
renderingThumbnails(publicationsData);

isEventBigPicture(publicationsData);
