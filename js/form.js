const MAX_HASHTAGS = 5;
const ErrorText = {
  FORMAT_HASHTAG: 'Не правильная форма записи хештега',
  COUNT_VALIDATION: 'Не больше пяти хэш-тегов',
  UNIQUENESS_VALIDATION: 'Не уникальный хэш-тег'
};

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const textHashtag = form.querySelector('.text__hashtags');
const buttonCancel = document.querySelector('#upload-cancel');
const description = document.querySelector('.text__description');
const body = document.querySelector('body');

const hashtagTest = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// const validationForEmptySpaces = (value) => {
//   const hashtags = value.trim().split(' ')
//     .filter((tag) => tag.trim().length);
// };

const uniquenessValidation = (value) => {
  const lowerCaseHashtag = value.split(' ').map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtag.length === new Set(lowerCaseHashtag).size;
};

const hashtagCountValidation = (value) => {
  const hashtags = value.trim().split(' ')
    .filter((tag) => tag.trim().length);
  return hashtags.length <= MAX_HASHTAGS;
};

const hashtagEntryFormValidation = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(' ');
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

const onUploadFileChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const hideForm = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onButtonCancelClick = () => {
  hideForm();
};

const isInputFocus = () =>
  document.activeElement === textHashtag ||
  document.activeElement === description;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isInputFocus()) {
    evt.preventDefault();
    hideForm();
  }
}

const isEventUploadForm = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
  buttonCancel.addEventListener('click', onButtonCancelClick);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {isEventUploadForm};