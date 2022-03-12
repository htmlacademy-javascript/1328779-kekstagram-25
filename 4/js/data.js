import {getRandomInt, getRandomArrayElement} from './util.js';

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

const createPhoto = (newId) => (
  {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15,200),
    comments: [...Array(getRandomInt(1,5))].map( () => ( getRandomArrayElement(COMMENTS) ) )
  });

const createPhotos = (arrayLength) => ([...Array(arrayLength)].map( (elem,index) => (createPhoto(++index) ) ));

export {createPhoto, createPhotos};
