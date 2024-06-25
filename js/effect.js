const DefaultEffect = {
  min: 0,
  max: 1,
  step: 0.1,
};

const effectsRadio = document.querySelectorAll('.effects__radio');
const imgPreview = document.querySelector('.img-upload__preview');
const slider = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

valueElement.value = 100;
slider.setAttribute('disabled', true);

/**
 * Создание слайдера
 **/
noUiSlider.create(slider, {
  range: {
    min: DefaultEffect.min,
    max: DefaultEffect.max,
  },
  start: DefaultEffect.max,
  step: DefaultEffect.step,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

slider.noUiSlider.on('update', () => {
  valueElement.value = slider.noUiSlider.get();
});
