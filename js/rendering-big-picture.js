const picturesList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const overlay = document.querySelector('.overlay');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const picturePath = document.querySelector('.big-picture__img');

const fillingPublicationData = (evt) => {
  picturePath.querySelector('img').src = evt.target.src;
  picturePath.querySelector('img').alt = evt.target.alt;
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const openPicture = (evt) => {
  if (evt.target.nodeName === 'IMG') {
    bigPicture.classList.remove('hidden');
    fillingPublicationData(evt);

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
overlay.addEventListener('click', closePicture);
