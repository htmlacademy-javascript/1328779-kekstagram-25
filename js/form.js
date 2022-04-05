import {openModal} from './modal.js';
import {isEscapeKey} from './util.js';

const SCALE_VALUE = {min:25, max:100};
const HASHTAG_COUNT = 5;
const DESCRIPTION_LENGTH = 140;
const EFFECTS = {
  none:{name:'none',add:0,rate:0,unit:''},
  chrome:{name:'grayscale',add:0,rate:1,unit:''},
  sepia:{name:'sepia',add:0,rate:1,unit:''},
  marvin:{name:'invert',add:0,rate:100,unit:'%'},
  phobos:{name:'blur',add:0,rate:3,unit:'px'},
  heat:{name:'brightness',add:1,rate:2,unit:''}
};

const inputFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const previewPhoto = document.querySelector('.img-upload__preview').children[0];
const inputEffectList = document.querySelectorAll('.effects__radio');
const valueScale = document.querySelector('.scale__control--value');
const valueEffect = document.querySelector('.effect-level__value');
const btnScaleMinus = document.querySelector('.scale__control--smaller');
const btnScalePlus = document.querySelector('.scale__control--bigger');

const inputForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(inputForm,{
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});
const inputHashtags = document.querySelector('.text__hashtags');
const inputDescription = document.querySelector('.text__description');
inputFile.addEventListener('change', createForm );


const onEscKeydownForm = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

inputHashtags.addEventListener('keydown',onEscKeydownForm);
inputDescription.addEventListener('keydown',onEscKeydownForm);

const regexHash = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const getHashArray = (str) => (
  str.split(' ')
    .filter((e) => e.length)
    .map((e) => e.toUpperCase())
);

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

const changeScale = () =>  {
  previewPhoto.style.transform = `scale(${+valueScale.value/100})`;
};

const changeEffect = (effect) =>  {
  const { name, add, rate, unit } = EFFECTS[effect];
  if(effect !== 'none') {
    effect = `${name}(${add+valueEffect.value * rate / 100}${unit})`;
  }
  previewPhoto.style.filter = effect;
};

btnScaleMinus.addEventListener('click', () =>  {
  if(valueScale.value > SCALE_VALUE.min) {
    valueScale.value = +valueScale.value-25;
    changeScale();
  }
});

btnScalePlus.addEventListener('click', () =>  {
  if(valueScale.value < SCALE_VALUE.max) {
    valueScale.value = +valueScale.value+25;
    changeScale();
  }
});

inputEffectList.forEach((element) => {
  element.addEventListener('change',(evt) => {
    changeEffect(evt.target.value);
  });
});

function createForm () {
  previewPhoto.src = window.URL.createObjectURL(inputFile.files[0]);
  valueScale.value = 100;
  valueEffect.value = 100;
  changeEffect('none');

  openModal(uploadForm, '.img-upload__cancel', () => {
    inputFile.value = '';
  });
}


inputForm.addEventListener('submit', (evt) => {
  evt.preventDefault();


  if (pristine.validate()) {
    inputForm.submit();
  }
});
