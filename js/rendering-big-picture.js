const picturesList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const openPicture = (evt) => {
  if (evt.target.nodeName === 'IMG') {
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const closePicture = (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

picturesList.addEventListener('click', openPicture);

buttonClose.addEventListener('click', closePicture);

