const containerForPicture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Сборка миниатюры
 * @param {Object} - данные миниатюры
 * @return {Object} - заполненный шаблон миниатюры
 */
const getThumbnail = ({url, description, comments, likes, id}) => {
  const clonePictureTemplate = pictureTemplate.cloneNode(true);
  clonePictureTemplate.querySelector('.picture__img').src = url;
  clonePictureTemplate.querySelector('.picture__img').alt = description;
  clonePictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  clonePictureTemplate.querySelector('.picture__likes').textContent = likes;
  clonePictureTemplate.dataset.thumbnailId = id;
  return clonePictureTemplate;
};

/**
 * Отрисовка миниатюр
 * @param {Array} - массив миниатюр
 */
const renderingThumbnails = (publications) => {
  containerForPicture.querySelectorAll('.picture')
    .forEach((element) => element.remove());
  const publicationListFragment = document.createDocumentFragment();
  publications.forEach((thumbnail) => {
    publicationListFragment.append(getThumbnail(thumbnail));
  });
  containerForPicture.append(publicationListFragment);
};

export {renderingThumbnails};
