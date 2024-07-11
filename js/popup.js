import {isKeydownEscape} from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

/**
 * Отрисовать модальное окно
 * @param {Object} popup - разметка модального окна
 */
const renderPopup = (popup) => {
  document.body.append(popup);
  const successButton = popup.querySelector('button');

  /**
   *  Закрыть модальное окно
   */
  const closePopup = () => {
    popup.remove();
    document.removeEventListener('keydown', onPopupDocumentKeydown);
  };

  /**
   * Обработчик нажатия ESC
   */
  function onPopupDocumentKeydown (evt) {
    if (isKeydownEscape(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  /**
   * Обработчик клика по оверлею
   */
  const onOverlayClick = (evt) => {
    if (evt.target !== popup) {
      return;
    }
    closePopup();
  };

  successButton.addEventListener('click', () => {
    closePopup();
  });
  document.addEventListener('keydown', onPopupDocumentKeydown);
  popup.addEventListener('click', onOverlayClick);
};

/**
 * Открыть успешное модальное окно
 */
const openSuccesPopup = () => {
  const cloneSuccesPopup = successPopup.cloneNode(true);
  renderPopup(cloneSuccesPopup);
};

/**
 * Открыть модальное окно с ошибкой
 */
const openErrorPopup = () => {
  const cloneErrorPopup = errorPopup.cloneNode(true);
  renderPopup(cloneErrorPopup);
};

export {openSuccesPopup, openErrorPopup};
