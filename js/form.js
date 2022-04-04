import {openModal} from './modal.js';
import {isEscapeKey} from './util.js';


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

const EFFECTS = {
  chrome:{name:'grayscale',add:0,rate:1,unit:''},
  sepia:{name:'sepia',add:0,rate:1,unit:''},
  marvin:{name:'invert',add:0,rate:100,unit:'%'},
  phobos:{name:'blur',add:0,rate:3,unit:'px'},
  heat:{name:'brightness',add:1,rate:2,unit:''}
};
inputFile.addEventListener('change', createForm );


const onEscKeydownForm = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
inputHashtags.addEventListener('keydown',onEscKeydownForm);
inputDescription.addEventListener('keydown',onEscKeydownForm);

const reHash = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


function validateHash (value) {
  return !value.split(' ').find((e) => (!reHash.test(e)));
}

pristine.addValidator(
  inputHashtags,
  validateHash,
  'Неверный хэштег!'
);

function validateHashLength (value) {
  return value.split(' ').filter((e) => e.length>0).length <= 5;
}

pristine.addValidator(
  inputHashtags,
  validateHashLength,
  'Допустимо не больше пяти хэштегов!'
);

function validateHashRepeat (value) {
  const arr = value.split(' ').map((e) => e.toUpperCase());
  return !(arr.length > Array.from(new Set(arr)).length);
}

pristine.addValidator(
  inputHashtags,
  validateHashRepeat,
  'Недопустимо повторение хэштегов!'
);

function validateDescription (value) {
  return !(value.length > 140);
}

pristine.addValidator(
  inputDescription,
  validateDescription,
  'Максимальная длина комментария 140 символов!'
);

const changeScale = () =>  {
  previewPhoto.style.transform = `scale(${+valueScale.value/100})`;
};

const changeEffect = (effect) =>  {
  if(effect !== 'none') {
    effect = `${EFFECTS[effect].name}(${EFFECTS[effect].add+valueEffect.value * EFFECTS[effect].rate / 100}${EFFECTS[effect].unit})`;
  }
  previewPhoto.style.filter = effect;
};

btnScaleMinus.addEventListener('click', () =>  {
  if(valueScale.value >= 25) {
    valueScale.value = +valueScale.value-25;
    changeScale();
  }
});

btnScalePlus.addEventListener('click', () =>  {
  if(valueScale.value <= 75) {
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
