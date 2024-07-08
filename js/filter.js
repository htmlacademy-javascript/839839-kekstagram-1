const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;

const showFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
};

showFilter();

filterElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const clickedButton = evt.target;
  if (clickedButton === currentFilter) {
    return;
  }
  filterElement.querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;

});
