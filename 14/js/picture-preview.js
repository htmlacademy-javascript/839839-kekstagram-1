const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

/**
 * Добавить событие по выбору файла
 */
const addEventListenerFileChooser = () =>
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      photoPreview.src = URL.createObjectURL(file);
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${photoPreview.src}')`;
      });
    }
  });

export {addEventListenerFileChooser};
