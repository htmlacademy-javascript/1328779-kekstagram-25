const SCALE_VALUE = {
  min:25,
  max:100,
  step:25
};

const EFFECTS = {
  none  :{
    name:'none',
    min:0,
    max:0,
    rate:0,
    unit:''
  },
  chrome:{
    name:'grayscale',
    min:0,
    max:10,
    rate:0.1,
    unit:''
  },
  sepia :{
    name:'sepia',
    min:0,
    max:10,
    rate:0.1,
    unit:''
  },
  marvin:{
    name:'invert',
    min:0,
    max:100,
    rate:1,
    unit:'%'
  },
  phobos:{
    name:'blur',
    min:0,
    max:30,
    rate:0.1 ,
    unit:'px'
  },
  heat  :{
    name:'brightness',
    min:1,
    max:30 ,
    rate:0.1,
    unit:''
  }
};

const previewPhoto = document.querySelector('.img-upload__preview').children[0];
const inputScale = document.querySelector('.scale__control--value');
const inputLevel = document.querySelector('.effect-level__value');
const inputEffectList = document.querySelectorAll('.effects__radio');
const btnScaleMinus = document.querySelector('.scale__control--smaller');
const btnScalePlus = document.querySelector('.scale__control--bigger');
const sliderElement = document.querySelector('.effect-level__slider');

// МАСШТАБ
const getScale = () => (Number(inputScale.value.substr(0, inputScale.value.length-1)));

const changeScale = (scaleValue) =>  {
  inputScale.value=`${scaleValue.toFixed(0)}%`;
  previewPhoto.style.transform = `scale(${+scaleValue/100})`;
};


const onclickBtnMinus =  () =>  {
  const scaleValue = getScale();
  const { min, step } = SCALE_VALUE;
  if(scaleValue > min) {
    changeScale(scaleValue-step);
  }
};

const onclickBtnPlus = () =>  {
  const scaleValue = getScale();
  const { max, step } = SCALE_VALUE;
  if(scaleValue < max) {
    changeScale(scaleValue+step);
  }
};

// ЭФФЕКТ

const getEffect = () => (Array.from(inputEffectList).find((e)=>e.checked).value);

// применяем эффект
const changeEffect = (effect) =>  {
  const { name, rate, unit } = EFFECTS[effect];
  const effectValue = Number(sliderElement.noUiSlider.get());
  // значение инпута формы
  inputLevel.value = effectValue;
  // свойства изображения
  let filter = effect;
  if(effect !== 'none') {
    filter = `${name}(${effectValue * rate}${unit})`;
  }
  previewPhoto.style.filter = filter;
};

// создание слайдера
const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {min: 0, max: 1 },
    start: 1,
    step: 1,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    changeEffect(getEffect());
  });
};

// инициализация слайдера
const initEffect = (effect) => {
  const { min, max } = EFFECTS[effect];
  // установки слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: 1
  });
  // значение инпута формы
  inputLevel.value = max;
  if(effect === 'none') {
    sliderElement.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
  }
  changeEffect(effect);
};


const onchangeBtnRadio = (evt) => {
  const effect = evt.target.value;
  initEffect(effect);
};


// инициализация изображения
const initPhotoEditor = (file) => {
  previewPhoto.src = window.URL.createObjectURL(file);
  createSlider();
  initEffect(getEffect());
  changeScale(100);
  inputEffectList.forEach((element) => {
    element.addEventListener('change',onchangeBtnRadio);
  });
  btnScaleMinus.addEventListener('click',onclickBtnMinus);
  btnScalePlus.addEventListener('click', onclickBtnPlus);
};

const dropPhotoEditor = () => {
  inputEffectList.forEach((element) => {
    element.removeEventListener('change',onchangeBtnRadio);
  });
  btnScaleMinus.removeEventListener('click',onclickBtnMinus);
  btnScalePlus.removeEventListener('click', onclickBtnPlus);
  sliderElement.noUiSlider.destroy();
};

export {initPhotoEditor, dropPhotoEditor};
