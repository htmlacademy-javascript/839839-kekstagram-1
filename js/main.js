import {getPhotos} from './mocks/data.js';
import {PHOTO_COUNT} from './mocks/data-generation.js';
import {renderingThumbnails} from './rendering-pictures.js';
import {openPicture, closePicture} from './rendering-big-picture.js';

const publicationsData = getPhotos(PHOTO_COUNT);
renderingThumbnails(publicationsData);

const picturesList = document.querySelector('.pictures');
const buttonClose = document.querySelector('.big-picture__cancel');

picturesList.addEventListener('click', openPicture);
buttonClose.addEventListener('click', closePicture);
// overlay.addEventListener('click', closePicture);

export {publicationsData};
