import {debounce, getRandomPosNeg} from './util.js';
// отрисовка фото на основном экране
import {drawPhotos} from './draw.js';

const DELAY_DRAW = 500;


// отрисовка с учетом фильтра
// вынесена в отдельную функция для устранения дребезга
const drawFilteredPhotos = (photos) => {

  const filterId = document.querySelector('.img-filters__button--active').id;

  // случайные 10 фото
  if (filterId === 'filter-random') {
    drawPhotos([...photos]
      .sort(() => (getRandomPosNeg()))
      .slice(0, 10)
    );
  }

  // сортировка по кол-ву комментариев
  else if (filterId === 'filter-discussed') {
    drawPhotos([...photos]
      .sort((photo1, photo2) => photo2.comments.length - photo1.comments.length)
    );
  }

  // по умолчанию
  else {
    drawPhotos(photos);
  }
};

// обработка выбора фильтра
const setFilterClick = (button, drawFunction) => {
  button.addEventListener( 'click', (evt) => {
    const filterId = evt.target.id;
    const filterButtonOld = document.querySelector('.img-filters__button--active');
    const filterButtonNew = document.querySelector(`${'#'}${filterId}`);
    filterButtonOld.classList.remove('img-filters__button--active');
    filterButtonNew.classList.add('img-filters__button--active');
    drawFunction();
  });
};

// активируем фильтр
const createFilter = (photos) => {

  const filterButtons = document.querySelectorAll('.img-filters__button');
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    setFilterClick(
      button,
      debounce(() => drawFilteredPhotos(photos), DELAY_DRAW)
    );

  });
};

export {createFilter, setFilterClick, drawFilteredPhotos};
