import {receivePhoto} from './api.js';
import {drawPhotos} from './main-draw.js';
import {createModalMessages} from './modal.js';
import {createFilter} from './main-filter.js';
import './form.js';

const loadPhotos = receivePhoto(
  (photos) => {

    // отрисовываем фото на основной странице
    drawPhotos(photos);
    // создаем фильтр
    createFilter(photos);

  },
  () => {
    createModalMessages('loading');
  }
);

loadPhotos();
