import {isEscapeKey} from './util.js';

const HASHTAG_COUNT = 5;
const DESCRIPTION_LENGTH = 140;
const regexHash = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const inputForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');

const onEscKeydownForm = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const getHashArray = (str) => (
  str.split(' ')
    .filter((e) => e.length)
    .map((e) => e.toUpperCase())
);

const pristine = new Pristine(inputForm,{
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const validateHash = (value) => {
  const arrayMessage = [];
  if(getHashArray(value).find((e) => !regexHash.test(e))) {
    arrayMessage.push('Неверный хэштег! ');
  }
  if (getHashArray(value).length > HASHTAG_COUNT) {
    arrayMessage.push(`Допустимо не больше ${HASHTAG_COUNT} хэштегов! `);
  }
  if (getHashArray(value).length > Array.from(new Set(getHashArray(value))).length) {
    arrayMessage.push('Недопустимо повторение хэштегов!');
  }
  return arrayMessage;
};

pristine.addValidator(
  inputHashtags,
  (value) => (validateHash(value).length===0),
  (value) => (validateHash(value).join(' '))
);

pristine.addValidator(
  inputDescription,
  (value) => !(value.length > DESCRIPTION_LENGTH),
  `Максимальная длина ${DESCRIPTION_LENGTH} символов!`
);


const getValidate = () => (pristine.validate());

const initValidate = () => {
  inputHashtags.addEventListener('keydown',onEscKeydownForm);
  inputDescription.addEventListener('keydown',onEscKeydownForm);
};

const dropValidate = () => {
  inputHashtags.removeEventListener('keydown',onEscKeydownForm);
  inputDescription.removeEventListener('keydown',onEscKeydownForm);
  pristine.reset(); // вызывать destroy() смысла нет - event-ы остаются
};

export {initValidate, dropValidate, getValidate};
