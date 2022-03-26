
const drawPhotos = (Photos) => {
  const Section = document.querySelector('.pictures');
  const Template = document.querySelector('#picture').content.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < Photos.length; i++) {
    const element = Template.cloneNode(true);
    element.querySelector('.picture__img').src = Photos[i].url;
    element.querySelector('.picture__likes').textContent = Photos[i].likes;
    element.querySelector('.picture__comments').textContent = Photos[i].comments.length;
    fragment.appendChild(element);
  }

  Section.appendChild(fragment);
  return fragment;
};

export {drawPhotos};
