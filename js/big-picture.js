import {isKeydownEscape} from './util.js';

const NUMBER_COMMENTS = 5;

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
  shownComment += NUMBER_COMMENTS;
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
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(comments, shownComment);
  });
};

/**
 * Заполение данными большого изображения
 * @param {Object} url, description, comments, likes - параметры изображения
 */
const showBigPicture = ({url, description, comments, likes}) => {
  const shownComment = 0;
  document.querySelector('.big-picture__img img').src = url;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.likes-count').textContent = likes;
  renderComments(comments, shownComment);
};

const onDocumentKeydown = (evt) => {
  if (isKeydownEscape(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

/**
 * Открыть окно с фотографией
 * @param {Object} evt - объект события
 * @param {Array} publicationsData - данные публикаций
 */
const onOpenPictureClick = (evt, publicationsData) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
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
 * @param {Object} evt - объект события
 */
const onClosePictureClick = (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

/**
 * Закрыть окно с фотографией по клику на оверлей
 * @param {Object} evt - объект события
 */
const onOverlayClick = (evt) => {
  const bigPicturePreview = evt.target.closest('.big-picture__preview');
  if (bigPicturePreview) {
    return;
  }
  onClosePictureClick(evt);
};

/**
 * Закрыть окно с фотографией по клику на оверлей
 * @param {Array} pictureData - данные публикаций
 */
const isEventBigPicture = (pictureData) => {
  picturesList.addEventListener('click', (evt) => {
    onOpenPictureClick(evt, pictureData);
  });
  buttonClose.addEventListener('click', onClosePictureClick);
  overlay.addEventListener('click', onOverlayClick);
};

export {isEventBigPicture};
