import {getPhotos} from './mocks/data.js';
import {PHOTO_COUNT} from './mocks/data-generation.js';

const containerForPicture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const clonePictureTemplate = pictureTemplate.cloneNode(true);

