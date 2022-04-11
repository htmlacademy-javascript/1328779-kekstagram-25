import {isEscapeKey} from './util.js';

const SECTION_MESSAGE = {
  success: {
    id: '#success',
    section: '.success',
    button: '.success__button'
  },
  error: {
    id: '#error',
    section: '.error',
    button: '.error__button'
  },
  messages: {
    id: '#messages',
    section: '.messages',
    button: '.messages__button'
  },
  loading: {
    id: '#error-loading',
    section: '.error-loading',
    button: ''
  }
};

let sectionModal;
let btnCancel;
let closeModalAdd;
let sectionMessages;
let buttonMessages;

const body = document.querySelector('body');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal (section, buttonClass, closeModalUser) {
  sectionModal = section;
  btnCancel = sectionModal.querySelector(buttonClass);
  closeModalAdd = closeModalUser;
  sectionModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  btnCancel.addEventListener('click', closeModal);
}

function closeModal () {
  if(closeModalAdd) {
    closeModalAdd();
  }
  sectionModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  btnCancel.removeEventListener('click', closeModal);
}

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    dropModalMessages();
  }
};

function dropModalMessages () {
  if (buttonMessages !== null) {
    buttonMessages.removeEventListener('click', dropModalMessages);
  }
  document.removeEventListener('keydown', onMessageEscKeydown);
  sectionMessages.remove();
}

function createModalMessages (typeModal) {
  const { id, section, button} = SECTION_MESSAGE[typeModal];
  sectionMessages = document.querySelector(id).content.querySelector(section).cloneNode(true);
  if(button === '') {
    buttonMessages = null;
  } else {
    buttonMessages = sectionMessages.querySelector(button);
    buttonMessages.addEventListener('click', dropModalMessages);
  }
  document.addEventListener('keydown', onMessageEscKeydown);
  body.append(sectionMessages);
}


export {openModal, closeModal, createModalMessages};
