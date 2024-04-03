import {generatePhoto} from './data-generation.js';

/**
 * Получить массив фотографий
 * @param {number} value - количество фотографий
 * @return {Array} - массив фотографий
 */
const getPhotos = (value) => Array.from({length: value},
  (_, index) => generatePhoto(index + 1));

export {getPhotos};
