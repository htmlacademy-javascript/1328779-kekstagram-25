// экран предпросмотра фото
import {fillPreview} from './preview.js';

const drawPhotos = (photos) => {
  const Section = document.querySelector('.pictures');
  const Template = document.querySelector('#picture').content.querySelector('.picture');

  const fragment = document.createDocumentFragment();
  // очищаем список фото
  Section.querySelectorAll('.picture').forEach((picture) => picture.remove());
  // добавляем список фото
  photos.forEach( (photo) => {
    const element = Template.cloneNode(true);
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    element.addEventListener('click', () => {
      fillPreview(photo);
    });
    fragment.appendChild(element);
  });

  Section.appendChild(fragment);
};

export {drawPhotos};
