const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Музей в Питере',
  'Фонтан и монета на счастье.',
  'Мария на пляже в Абхазии.',
  'Сплав на байдарках.',
  'Виктор и его коллекция колокольчиков.',
  'Камчатские вулканы.',
  'Леонид на своем первом мальчишнике.',
  'Студент спит, пара идет.',
  'Просто портрет.'
];

const getRandomInt = function(min,max)
{
  return Math.round(Math.random()*(max+1-min)+min);
};

const validStrLen = function(str, maxLen)
{
  return str.length <= maxLen;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const createPhoto = (newId) => {
  return {
    id: newId,
    url: 'photos/'+newId.toString()+'.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15,200),
    comments: [...Array(getRandomInt(1,5))].map(() => (getRandomArrayElement(COMMENTS)))
  };
};

const PHOTOS = [...Array(25)].map( (elem,index) => (createPhoto(++index)));

validStrLen('12345',PHOTOS.length);
//console.log(PHOTOS);
