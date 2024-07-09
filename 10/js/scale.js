const STEP = 25;
const ScaleValue = {
  MAX: 100,
  MIN: 25
};

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const imgPrevie = document.querySelector('.img-upload__preview > img');

/**
 * Изменение размера изображения
 */
const resizePicture = (value) => {
  imgPrevie.style.transform = `scale(${value / 100})`;
  inputScale.value = `${value}%`;
};

const initialScale = () => {
  resizePicture(ScaleValue.MAX);
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
};

const addEventListenerButton = () => {
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
};

export {addEventListenerButton, initialScale};
