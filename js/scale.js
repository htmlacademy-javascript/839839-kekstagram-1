const STEP = 25;
const ScaleValue = {
  MAX: 100,
  MIN: 25
};

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const imgPrevie = document.querySelector('.img-upload__preview');

inputScale.value = '100%';

const resizePicture = (value) => {
  value /= 100;
  imgPrevie.style.transform = `scale(${value})`;
};

buttonSmaller.addEventListener('click', () => {
  inputScale.value = parseInt(inputScale.value, 10) - STEP;
  if (inputScale.value <= ScaleValue.MIN) {
    inputScale.value = ScaleValue.MIN;
  }
  resizePicture(inputScale.value);
  inputScale.value += '%';
});

buttonBigger.addEventListener('click', () => {
  inputScale.value = parseInt(inputScale.value, 10) + STEP;
  if (inputScale.value >= ScaleValue.MAX) {
    inputScale.value = ScaleValue.MAX;
  }
  resizePicture(inputScale.value);
  inputScale.value += '%';
});
