// генерация случайных данных
//import {createPhotos} from './data.js';
// api с сервером
import {createLoader} from './api.js';
// отрисовка фото на основном экране
import {drawPhotos} from './draw.js';
// экран предпросмотра фото
import {fillPreview} from './preview.js';
// форма редактирования фото
import './form.js';
// модальные окна
import {createModalMessages} from './modal.js';




const loadPhotos = createLoader(
  (photos) => drawPhotos(photos, fillPreview),
  () => {

    createModalMessages('loading');
    // генерация случайных данных
    //drawPhotos(createPhotos(25), fillPreview);
  }
);
loadPhotos();
