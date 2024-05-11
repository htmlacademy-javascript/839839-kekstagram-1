const picturesList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');

picturesList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'IMG') {
    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
      }
    });
  }
});

buttonClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
});


