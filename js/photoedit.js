const SCALE_VALUE = {min:25, max:100};

const EFFECTS = {
  none  :{name:'none'       ,min:0,max:0  ,rate:0   ,unit:''  },
  chrome:{name:'grayscale'  ,min:0,max:10 ,rate:0.1 ,unit:''  },
  sepia :{name:'sepia'      ,min:0,max:100,rate:0.1 ,unit:''  },
  marvin:{name:'invert'     ,min:0,max:100,rate:1   ,unit:'%' },
  phobos:{name:'blur'       ,min:0,max:30 ,rate:0.1 ,unit:'px'},
  heat  :{name:'brightness' ,min:1,max:30 ,rate:0.1 ,unit:''  }
};

const previewPhoto = document.querySelector('.img-upload__preview').children[0];
const inputScale = document.querySelector('.scale__control--value');
const inputLevel = document.querySelector('.effect-level__value');
const inputEffectList = document.querySelectorAll('.effects__radio');
const btnScaleMinus = document.querySelector('.scale__control--smaller');
const btnScalePlus = document.querySelector('.scale__control--bigger');
const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 10,
  },
  start: 10,
  step: 1,
  connect: 'lower',
});

const getScale = () => (Number(inputScale.value.substr(0, inputScale.value.length-1)));

const changeScale = (scaleValue) =>  {
  inputScale.value=`${scaleValue.toFixed(0)}%`;
  previewPhoto.style.transform = `scale(${+scaleValue/100})`;
};

btnScaleMinus.addEventListener('click', () =>  {
  const scaleValue = getScale();
  if(scaleValue > SCALE_VALUE.min) {
    changeScale(scaleValue-25);
  }
});

btnScalePlus.addEventListener('click', () =>  {
  const scaleValue = getScale();
  if(scaleValue < SCALE_VALUE.max) {
    changeScale(scaleValue+25);
  }
});

const getEffect = () => (Array.from(inputEffectList).find((e)=>e.checked).value);


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
  console.log(filter);
  previewPhoto.style.filter = filter;
};

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
    sliderElement.setAttribute('disabled', true);
  } else {
    sliderElement.removeAttribute('disabled');
  }
};

sliderElement.noUiSlider.on('update', () => {
  changeEffect(getEffect());
});

inputEffectList.forEach((element) => {
  element.addEventListener('change',(evt) => {
    const effect = evt.target.value;
    initEffect(effect);
    changeEffect(effect);
  });
});

const initPhotoEditor = (file) => {
  previewPhoto.src = window.URL.createObjectURL(file);
  inputEffectList[0].checked = true;
  initEffect(getEffect());
  changeScale(100);
};

export {initPhotoEditor, changeEffect, changeScale};
