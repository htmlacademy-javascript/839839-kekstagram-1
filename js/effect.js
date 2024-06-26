const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: ' brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

/**
 * Проверка на оригинал
 */
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

/**
 * Показать слайдер
 */
const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

/**
 * Скрыть слайдер
 */
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

/**
 * Создание слайдера
 */
noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
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

hideSlider();

/**
 * Обновление настройки слайдера
 */
const updateSliderOptions = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

/**
 * Сбросить эффекты
 */
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSliderOptions();
};

/**
 * Обработчик клика по списку эффектов
 */
const onSliderUpdate = () => {
  effectLevelValue.value = slider.noUiSlider.get();
  const sliderValue = effectLevelValue.value;
  imgPreview.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
};

/**
 * Обработчик события изменения слайдера
 */
const onEffectsListClick = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `effects__preview--${chosenEffect.name}`;
  updateSliderOptions();
};

/**
 * Добавить эффекты на изображения
 */
const addEventListenerEffects = () => {
  effectsList.addEventListener('click', onEffectsListClick);
  slider.noUiSlider.on('update', onSliderUpdate);
};

export {resetEffects, addEventListenerEffects};
