import {openModal} from './modal.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const fillPreview = (photo) => {
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.querySelector('.big-picture__img').children[0].src = photo.url;
  document.querySelector('.social__caption').textContent = photo.description;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.comments.length;

  const commentTemplate = commentsList.children[0];
  const Fragment = document.createDocumentFragment();

  photo.comments.forEach( (comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    Fragment.appendChild(newComment);
  });

  commentsList.innerHTML = '';
  commentsList.appendChild(Fragment);

  openModal(bigPicture, '.big-picture__cancel');
};

export {fillPreview};
