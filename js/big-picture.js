import {isKeydownEscape, createShownComment} from './util.js';

const picturesList = document.querySelector('.pictures');
const buttonClose = document.querySelector('.big-picture__cancel');
const containerComment = document.querySelector('.social__comments');
const comment = document.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const overlay = document.querySelector('.overlay');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

/**
 * Заполение данными комментария
 * @param {Object} avatar, name, message, id - параметры комментария
 * @return {Object} - элемент комментария
 */
const showComment = ({avatar, name, message, id}) => {
  const cloneElementComment = comment.cloneNode(true);
  cloneElementComment.querySelector('.social__picture').src = avatar;
  cloneElementComment.querySelector('.social__picture').alt = name;
  cloneElementComment.querySelector('.social__text').textContent = message;
  cloneElementComment.dataset.avatarId = id;
  return cloneElementComment;
};

/**
 * Отрисовка комментариев
 * @param {Array} comments - Массив комментариев
 * @param {Number} shownComment - Количество показываемых комментариев
 */
const renderComments = (comments, shownComment) => {
  if (comments.length <= shownComment) {
    commentsLoader.classList.add('hidden');
    shownComment = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < shownComment; i++) {
    fragment.append(showComment(comments[i]));
  }
  commentCount.innerHTML = `${shownComment} из <span class="comments-count">${comments.length}</span> комментариев`;
  containerComment.innerHTML = '';
  containerComment.append(fragment);
};

/**
 * Заполение данными большого изображения
 * @param {Object} url, description, comments, likes - параметры изображения
 */
const showBigPicture = ({url, description, comments, likes}) => {
  const shownComment = createShownComment();
  document.querySelector('.big-picture__img img').src = url;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.likes-count').textContent = likes;
  renderComments(comments, shownComment());
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(comments, shownComment());
  });
};

/**
 * Открыть окно с фотографией
 * @param {Object} evt - объект события
 * @param {Array} publicationsData - данные публикаций
 */
const OpenPicture = (evt, publicationsData) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();
  const picture = publicationsData.find(
    (publication) => publication.id === +thumbnail.dataset.thumbnailId
  );
  showBigPicture(picture);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 * Закрыть окно с фотографией
 */
const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

/**
 * Обработчик по кнопке "Закрыть" - окна с фотографией
 * @param {Object} evt - объект события
 */
const onClosePictureClick = (evt) => {
  evt.preventDefault();
  closePicture();
};

/**
 * Обработчик для overlay
 * @param {Object} evt - объект события
 */
const onOverlayClick = (evt) => {
  const bigPicturePreview = evt.target.closest('.big-picture__preview');
  if (bigPicturePreview) {
    return;
  }
  closePicture();
};

function onDocumentKeydown(evt) {
  if (isKeydownEscape(evt)) {
    evt.preventDefault();
    closePicture();
  }
}

/**
 * Закрыть окно с фотографией по клику на оверлей
 * @param {Array} pictureData - данные публикаций
 */
const addEventListenerThumbnail = (pictureData) => {
  picturesList.addEventListener('click', (evt) => {
    OpenPicture(evt, pictureData);
  });
  buttonClose.addEventListener('click', onClosePictureClick);
  overlay.addEventListener('click', onOverlayClick);
};

export {addEventListenerThumbnail};
