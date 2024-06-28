import {isKeydownEscape} from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

const renderPopup = (popup) => {
  document.body.append(popup);
  const successButton = popup.querySelector('button');

  const closePopup = () => {
    popup.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (evt) {
    if (isKeydownEscape(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  successButton.addEventListener('click', () => {
    closePopup();
  });

  document.addEventListener('keydown', onDocumentKeydown);

  const onOverlayClick = (evt) => {
    if (evt.target !== popup) {
      return;
    }
    closePopup();
  };
  popup.addEventListener('click', onOverlayClick);
};

const openSuccesPopup = () => {
  const cloneSuccesPopup = successPopup.cloneNode(true);
  renderPopup(cloneSuccesPopup);
};

const openErrorPopup = () => {
  const cloneErrorPopup = errorPopup.cloneNode(true);
  renderPopup(cloneErrorPopup);
};

export {openSuccesPopup, openErrorPopup};
