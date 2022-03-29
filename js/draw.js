
const drawPhotos = (Photos) => {
  const Section = document.querySelector('.pictures');
  const Template = document.querySelector('#picture').content.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  Photos.forEach( (Photo) => {
    const element = Template.cloneNode(true);
    element.querySelector('.picture__img').src = Photo.url;
    element.querySelector('.picture__likes').textContent = Photo.likes;
    element.querySelector('.picture__comments').textContent = Photo.comments.length;
    fragment.appendChild(element);
  });

  Section.appendChild(fragment);
  return fragment;
};

export {drawPhotos};
