import {receivePhoto} from './api.js';
import {drawPhotos} from './draw.js';
import {createModalMessages} from './modal.js';

// глобальный массив фотографий
let photos = [];

const setPhotos = (data) => (photos = data);

const getPhotos = () => (photos);

const loadPhotos = receivePhoto(
  (data) => {

    setPhotos(data);
    // отрисовываем фото на основной странице
    drawPhotos(data);
  },
  () => {
    createModalMessages('loading');
  }
);

export {loadPhotos, setPhotos, getPhotos};
