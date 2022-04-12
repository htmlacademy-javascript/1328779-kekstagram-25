import {getRandomInt} from './util.js';
// отрисовка фото на основном экране
import {drawPhotos} from './draw.js';

// отрисовка с учетом фильтра
// вынесена в отдельную функция для устранения дребезга
const drawFilteredPhotos = (photos) => {

  const filterId = document.querySelector('.img-filters__button--active').id;

  // случайные 10 фото
  if (filterId === 'filter-random') {
    drawPhotos(photos
      .slice()
      .sort(() => (getRandomInt(0, photos.length) - Math.ceil(photos.length / 2)))
      .slice(0, 10)
    );
  }

  // сортировка по кол-ву комментариев
  else if (filterId === 'filter-discussed') {
    drawPhotos(photos
      .slice()
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

export {setFilterClick, drawFilteredPhotos};
