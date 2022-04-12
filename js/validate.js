import {isEscapeKey} from './util.js';

const HASHTAG_COUNT = 5;
const DESCRIPTION_LENGTH = 140;
const regexHash = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
let messages;

const inputForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');

const onEscKeydownForm = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const getHashtags = (str) => (
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

const validateHash = (hashtagString) => {
  messages = [];
  const hashtags = getHashtags(hashtagString);
  const badHashtag = hashtags.find((e) => !regexHash.test(e));
  if(badHashtag) {
    messages.push(`Неверный хэштег! (${badHashtag}) `);
  }
  if (hashtags.length > (new Set(hashtags)).size) {
    messages.push('Недопустимо повторение хэштегов! ');
  }
  if (hashtags.length > HASHTAG_COUNT) {
    messages.push(`Допустимо не больше ${HASHTAG_COUNT} хэштегов! `);
  }
  return (messages.length===0);
};

pristine.addValidator(
  inputHashtags,
  (hashtag) => (validateHash(hashtag)),
  () => (messages[0])
);

pristine.addValidator(
  inputDescription,
  (description) => !(description.length > DESCRIPTION_LENGTH),
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
