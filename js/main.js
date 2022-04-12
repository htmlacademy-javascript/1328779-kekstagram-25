import {debounce} from './util.js';
// api с сервером
import {createLoader} from './api.js';
// отрисовка фото на основном экране
import {drawPhotos} from './draw.js';
// работа с фильтром
import {drawFilteredPhotos, setFilterClick} from './filter.js';
// модальные окна
import {createModalMessages} from './modal.js';
// форма редактирования фото
import './form.js';

const DELAY_DRAW = 500;


const loadPhotos = createLoader(
  (photos) => {

    // отрисовываем фото на основной странице
    drawPhotos(photos);

    // активируем фильтр
    const filterButtons = document.querySelectorAll('.img-filters__button');
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    filterButtons.forEach((button) => {
      setFilterClick(
        button,
        debounce(() => drawFilteredPhotos(photos), DELAY_DRAW)
      );
    });

  },
  () => {
    createModalMessages('loading');
  }
);
loadPhotos();
