import {openModal} from './modal.js';

let arrComments;
let offsetComments;

const COMMENTS_DISPLAY = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.comments-count');
const commentsLoader = document.querySelector('.comments-loader');

const fillComments = (offset) => {
  if(offsetComments+offset < arrComments.length) {
    offsetComments += offset;
  }

  commentsCount.textContent = arrComments.length-offsetComments;

  const commentTemplate = commentsList.children[0];
  const Fragment = document.createDocumentFragment();

  arrComments.filter((comment, index) => (index>=offsetComments && index<=(offsetComments+COMMENTS_DISPLAY-1))).forEach( (comment) => {
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
  document.querySelector('.comments-count').textContent = photo.comments.length;

  arrComments = photo.comments;
  offsetComments = 0;

  fillComments(0);

  openModal(bigPicture, '.big-picture__cancel');
};

commentsLoader.addEventListener('click', () =>  {
  fillComments(5);
});

export {fillPreview};
