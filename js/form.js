import {isKeydownEscape} from './util.js';
import {initialScale} from './scale.js';
import {resetEffects} from './effect.js';
import {sendData} from './api.js';
import {openSuccesPopup, openErrorPopup} from './popup.js';

const MAX_HASHTAGS = 5;
const ErrorText = {
  FORMAT_HASHTAG: 'Не правильная форма записи хештега',
  COUNT_VALIDATION: 'Не больше пяти хэш-тегов',
  UNIQUENESS_VALIDATION: 'Не уникальный хэш-тег'
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуем...'
};

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const textHashtag = form.querySelector('.text__hashtags');
const buttonCancel = document.querySelector('#upload-cancel');
const description = document.querySelector('.text__description');
const body = document.querySelector('body');
const buttonSubmit = document.querySelector('.img-upload__submit');

const hashtagTest = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

/**
 * Исключение лишних пробелов из массива
 */
const removeEmptySpaces = (value) => {
  const hashtags = value.trim().split(' ')
    .filter((tag) => tag.trim().length);
  return hashtags;
};

/**
 * Проверка на уникальность хештегов
 */
const uniquenessValidation = (value) => {
  const lowerCaseHashtag = removeEmptySpaces(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtag.length === new Set(lowerCaseHashtag).size;
};

/**
 * Проверка на количество допустимых хештегов
 */
const hashtagCountValidation = (value) => {
  const hashtags = removeEmptySpaces(value);
  return hashtags.length <= MAX_HASHTAGS;
};

/**
 * Проверка на форму написания хештега
 */
const hashtagEntryFormValidation = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = removeEmptySpaces(value);
  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtagTest.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(textHashtag, hashtagEntryFormValidation, ErrorText.FORMAT_HASHTAG);
pristine.addValidator(textHashtag, hashtagCountValidation, ErrorText.COUNT_VALIDATION);
pristine.addValidator(textHashtag, uniquenessValidation, ErrorText.UNIQUENESS_VALIDATION);

/**
 * Проверка фокуса на поле ввода
 */
const isInputFocus = () =>
  document.activeElement === textHashtag ||
  document.activeElement === description;

/**
 * Показать модальное окно
 */
const showModal = () => {
  initialScale();
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

/**
 * Скрыть модальное окно
 */
const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffects();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

/**
 * Обработчик для кнопки esc и проверка фокуса
 * @param {Object} evt - объект события
 */
function onDocumentKeydown(evt) {
  if (isKeydownEscape(evt) && !isInputFocus()) {
    evt.preventDefault();
    hideModal();
  }
}

/**
 * Обработчик для загрузки файла
 */
const onUploadFileChange = () => {
  showModal();
};

/**
 * Обработчик для кнопки закрыть
 */
const onButtonCancelClick = () => {
  hideModal();
};

/**
 * Блокировка кнопки опубликовать
 */
const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = SubmitButtonText.SENDING;
};

/**
 * Разблокировка кнопки опубликовать
 */
const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = SubmitButtonText.IDLE;
};

/**
 * Добавить событие на форму
 */
const addEventUploadForm = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
  buttonCancel.addEventListener('click', onButtonCancelClick);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockButtonSubmit();
      sendData(new FormData(form))
        .then(hideModal)
        .then(openSuccesPopup)
        .catch(openErrorPopup)
        .finally(unblockButtonSubmit);
    }
  });
  // .addEventListener('keydown', (evt) => {
  //   if (isKeydownEscape(evt) && document.querySelector('.error')) {
  //     evt.stopPropagation();
  //   }
  // });
};

export {addEventUploadForm};
