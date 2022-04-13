import {isEscapeKey} from './util.js';

const SECTION_MESSAGE = {
  success: {
    id: '#success',
    section: '.success',
    wrapper: '.success__inner',
    button: '.success__button'
  },
  error: {
    id: '#error',
    section: '.error',
    wrapper: '.error__inner',
    button: '.error__button'
  },
  messages: {
    id: '#messages',
    section: '.messages',
    wrapper: '.messages__inner',
    button: '.messages__button'
  },
  loading: {
    id: '#error-loading',
    section: '.error-loading',
    wrapper: '.error-loading__inner',
    button: ''
  }
};

let sectionModal;
let btnCancel;
let closeModalAdd;
let sectionMessages;
let wrapperMessages;
let buttonMessages;

const body = document.querySelector('body');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onButtonCancelClick = (evt) => {
  closeModal();
};

function openModal (section, buttonClass, closeModalUser) {
  sectionModal = section;
  btnCancel = sectionModal.querySelector(buttonClass);
  closeModalAdd = closeModalUser;
  sectionModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  btnCancel.addEventListener('click', onButtonCancelClick);
}

function closeModal () {
  if(closeModalAdd) {
    closeModalAdd();
  }
  sectionModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  btnCancel.removeEventListener('click', onButtonCancelClick);
}

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    dropModalMessages();
  }
};

const onButtonMessageClick = (evt) => {
  dropModalMessages();
};

const onWrapperMessageClick = (evt) => {
  evt.stopPropagation();
};

const onWindowClick = (evt) => {
  dropModalMessages();
};


function dropModalMessages () {
  if (buttonMessages !== null) {
    buttonMessages.removeEventListener('click', onButtonMessageClick);
  }
  window.removeEventListener('click', onWindowClick);
  wrapperMessages.removeEventListener('click', onWrapperMessageClick);
  document.removeEventListener('keydown', onMessageEscKeydown);
  sectionMessages.remove();
}

function createModalMessages (typeModal) {
  const { id, section, wrapper, button} = SECTION_MESSAGE[typeModal];
  sectionMessages = document.querySelector(id).content.querySelector(section).cloneNode(true);
  wrapperMessages = sectionMessages.querySelector(wrapper);
  if(button === '') {
    buttonMessages = null;
  } else {
    buttonMessages = sectionMessages.querySelector(button);
    buttonMessages.addEventListener('click', onButtonMessageClick);
  }
  document.addEventListener('keydown', onMessageEscKeydown);
  wrapperMessages.addEventListener('click', onWrapperMessageClick);
  window.addEventListener('click', onWindowClick);
  body.append(sectionMessages);
}


export {openModal, closeModal, createModalMessages};
