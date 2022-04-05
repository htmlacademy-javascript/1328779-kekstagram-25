import {getRandomInt, getRandomArrayElement} from './util.js';

let idPhoto = 0;
let idComment = 0;

const getIdPhoto = () => ++idPhoto;
const getIdComment = () => ++idComment;

const NAMES = [
  'Арсен',
  'Ринат',
  'Аврора',
  'Аделаида',
  'Коловарот',
  'Алан',
  'Кеша',
  'Драздаперма',
  'Рикардо',
  'Анатолий',
  'Кенни',
  'Васька'
];

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

const LIKE_COUNT = [15, 200];
const COMMENT_COUNT = [6, 19];
const AVATAR_COUNT = [1, 6];

const createComment = () => (
  {
    id: getIdComment(),
    avatar: `img/avatar-${getRandomInt(...AVATAR_COUNT)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  });

const createPhoto = () => {
  const newId = getIdPhoto();
  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(...LIKE_COUNT),
    comments: [...Array(getRandomInt(...COMMENT_COUNT))].map( () => ( createComment() ) )
  };
};

const createPhotos = (arrayLength) => ([...Array(arrayLength)].map( (elem,index) => (createPhoto(++index) ) ));

export {createPhoto, createPhotos};

