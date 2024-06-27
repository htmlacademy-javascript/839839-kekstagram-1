const STEP = 25;
const ScaleValue = {
  MAX: 100,
  MIN: 25
};

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const imgPrevie = document.querySelector('.img-upload__preview > img');

inputScale.value = '100%';

/**
 * Изменение размера изображения
 */
const resizePicture = (value) => {
  value /= 100;
  imgPrevie.style.transform = `scale(${value})`;
};

/**
 * Обработчик - уменьшает масштаб
 */
const onButtonSmallerClick = () => {
  inputScale.value = parseInt(inputScale.value, 10) - STEP;
  if (inputScale.value < ScaleValue.MIN) {
    inputScale.value = ScaleValue.MIN;
  }
  resizePicture(inputScale.value);
  inputScale.value += '%';
};

/**
 * Обработчик - увеличивает масштаб
 */
const onButtonBiggerClick = () => {
  inputScale.value = parseInt(inputScale.value, 10) + STEP;
  if (inputScale.value > ScaleValue.MAX) {
    inputScale.value = ScaleValue.MAX;
  }
  resizePicture(inputScale.value);
  inputScale.value += '%';
};

const addEventListenerButton = () => {
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
};

export {addEventListenerButton};
