import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentsList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const btnCancel = document.querySelector('.big-picture__cancel');

const fillModal = (photo) => {
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
};

const openModal = (photo) => {
  if( photo ) {
    fillModal(photo);
  }
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  btnCancel.addEventListener('click', closeModal);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

export {openModal, closeModal, fillModal};
