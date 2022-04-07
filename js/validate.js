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

pristine.addValidator(
  inputHashtags,
  (value) => !getHashArray(value).find((e) => !regexHash.test(e)),
  'Неверный хэштег!'
);

pristine.addValidator(
  inputHashtags,
  (value) => (getHashArray(value).length <= HASHTAG_COUNT),
  `Допустимо не больше ${HASHTAG_COUNT} хэштегов!`
);

pristine.addValidator(
  inputHashtags,
  (value) => !(getHashArray(value).length > Array.from(new Set(getHashArray(value))).length),
  'Недопустимо повторение хэштегов!'
);

pristine.addValidator(
  inputDescription,
  (value) => !(value.length > DESCRIPTION_LENGTH),
  `Максимальная длина ${DESCRIPTION_LENGTH} символов!`
);

const onsubmitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    inputForm.submit();
  }
};

// значения по умолчанию текстовых полей
const initValidate = () => {
  inputForm.addEventListener('submit', onsubmitForm);
  inputHashtags.addEventListener('keydown',onEscKeydownForm);
  inputDescription.addEventListener('keydown',onEscKeydownForm);
};

const dropValidate = () => {
  //pristine.reset();
  inputHashtags.removeEventListener('keydown',onEscKeydownForm);
  inputDescription.removeEventListener('keydown',onEscKeydownForm);
  inputForm.removeEventListener('submit', onsubmitForm);
  pristine.reset(); // вызывать destroy() смысла нет - eventы остаются
  inputForm.reset();
};

export {initValidate, dropValidate};
