import {isEscapeKey} from './util.js';

let sectionModal;
let btnCancel;
let closeModalAdd;
let ableEscKey = true;

const body = document.querySelector('body');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && ableEscKey) {
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

const setEscKey = (isAble) => {
  ableEscKey = (isAble === null ? true : isAble);
};

export {openModal, closeModal, setEscKey};
