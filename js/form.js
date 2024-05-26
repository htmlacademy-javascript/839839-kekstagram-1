const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const buttonCancel = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    overlay.classList.add('hidden');
  }
};

const onUploadFileChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onButtonCancelClick = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isEventUploadForm = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
  buttonCancel.addEventListener('click', onButtonCancelClick);
};

isEventUploadForm();
