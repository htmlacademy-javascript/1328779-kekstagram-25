import {receivePhoto} from './api.js';
import {drawPhotos} from './draw.js';
import {createModalMessages} from './modal.js';
import {createFilter} from './filter.js';
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
