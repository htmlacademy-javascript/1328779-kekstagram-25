
const drawPhotos = (photos, previewPhoto) => {
  const Section = document.querySelector('.pictures');
  const Template = document.querySelector('#picture').content.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  photos.forEach( (photo) => {
    const element = Template.cloneNode(true);
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    element.addEventListener('click', () => {
      previewPhoto(photo);
    });
    fragment.appendChild(element);
  });

  Section.appendChild(fragment);
  return fragment;
};

export {drawPhotos};
