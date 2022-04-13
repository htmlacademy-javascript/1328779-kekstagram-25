import {closeModal, createModalMessages, openModal} from './modal.js';
import {initPhotoEditor, dropPhotoEditor} from './form-photoedit.js';
import {initValidate, dropValidate, getValidate} from './form-validate.js';
import {sendPhoto} from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const inputFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const inputForm = document.querySelector('.img-upload__form');
const buttonSubmit = document.querySelector('#upload-submit');

inputFile.addEventListener('change', createForm );

const validFileName = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES
    .some( (it) => fileName.endsWith(it) );
  return matches;
};

const onsubmitForm = (evt) => {
  evt.preventDefault();
  if (getValidate()) {
    buttonSubmit.disable = true;
    sendPhoto(
      () => {
        closeModal();
        createModalMessages('success');
      },
      () => {
        closeModal();
        createModalMessages('error');
      },
      new FormData(evt.target),
    );
  }
};

function createForm () {
  const [file] = inputFile.files;
  if (!validFileName(file)) {
    return;
  }
  initPhotoEditor(file); // инициализация изображения
  initValidate(); // значения по умолчанию текстовых полей
  inputForm.addEventListener('submit', onsubmitForm);

  openModal(
    uploadForm,
    '.img-upload__cancel',
    () => {
      dropPhotoEditor();
      dropValidate();
      inputForm.removeEventListener('submit', onsubmitForm);
      inputForm.reset();
      inputFile.value = '';
    }
  );
}

