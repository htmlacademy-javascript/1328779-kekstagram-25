import {openModal} from './modal.js';
import {initPhotoEditor} from './photoedit.js';
import {initValidate} from './validate.js';

const inputFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
inputFile.addEventListener('change', createForm );

function createForm () {
  initPhotoEditor(inputFile.files[0]); // инициализация изображения
  initValidate(); // значения по умолчанию текстовых полей

  openModal(uploadForm, '.img-upload__cancel', () => {
    inputFile.value = '';
  });
}


