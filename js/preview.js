import {openModal} from './modal.js';

const COMMENTS_DISPLAY = 5;

let arrComments;
let offsetComments;

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

const fillComments = (offset) => {
  if(offsetComments+offset < arrComments.length) {
    offsetComments += offset;
  }
  else {
    offsetComments = arrComments.length;
    commentsLoader.classList.add('hidden');
  }

  const commentsCount = document.querySelector('.social__comment-count');
  commentsCount.innerHTML = `${offsetComments} из <span class="comments-count">${arrComments.length}</span> комментариев`;

  const commentTemplate = commentsList.children[0];
  const Fragment = document.createDocumentFragment();

  arrComments.filter((comment, index) => (index<=(offsetComments-1))).forEach( (comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    Fragment.appendChild(newComment);
  });

  commentsList.innerHTML = '';
  commentsList.appendChild(Fragment);

};

const fillPreview = (photo) => {
  document.querySelector('.big-picture__img').children[0].src = photo.url;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.likes-count').textContent = photo.likes;

  commentsLoader.classList.remove('hidden');

  arrComments = photo.comments;
  offsetComments = COMMENTS_DISPLAY;
  fillComments(0);

  openModal(bigPicture, '.big-picture__cancel');
};

commentsLoader.addEventListener('click', () =>  {
  fillComments(COMMENTS_DISPLAY);
});

export {fillPreview};
