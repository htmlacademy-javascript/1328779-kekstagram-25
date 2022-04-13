// экран предпросмотра фото
import {fillPreview} from './preview.js';

const drawPhotos = (photos) => {
  const section = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content.querySelector('.picture');

  const fragment = document.createDocumentFragment();
  // очищаем список фото
  section.querySelectorAll('.picture').forEach((picture) => picture.remove());
  // добавляем список фото
  photos.forEach( (photo) => {
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    element.addEventListener('click', () => {
      fillPreview(photo);
    });
    fragment.appendChild(element);
  });

  section.appendChild(fragment);
};

export {drawPhotos};
