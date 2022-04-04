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
const getHashArray = (str) => (str.split(' ').filter((e) => e.length>0).map((e) => e.toUpperCase()));

pristine.addValidator(
  inputHashtags,
  (value) => !getHashArray(value).find((e) => (!reHash.test(e))),
  'Неверный хэштег!'
);

pristine.addValidator(
  inputHashtags,
  (value) => (getHashArray(value).length <= 5),
  'Допустимо не больше пяти хэштегов!'
);

pristine.addValidator(
  inputHashtags,
  (value) => !(getHashArray(value).length > Array.from(new Set(getHashArray(value))).length),
  'Недопустимо повторение хэштегов!'
);

pristine.addValidator(
  inputDescription,
  (value) => !(value.length > 140),
  'Максимальная длина 140 символов!'
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
