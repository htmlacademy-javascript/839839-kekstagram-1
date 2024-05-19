import {isKeydownEscape} from './util.js';

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
 * Заполение данными большого изображения
 * @param {Object} url, description, comments, likes - параметры изображения
 */
const showBigPicture = ({url, description, comments, likes}) => {
  document.querySelector('.big-picture__img img').src = url;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  containerComment.innerHTML = '';
  comments.forEach((element) => {
    containerComment.append(showComment(element));
  });
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
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
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
