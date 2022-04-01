
const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};
const validStrLen = (str, maxLen) => (str.length <= maxLen);

const getRandomArrayElement = (elements) => (elements[getRandomInt(0, elements.length - 1)]);

const isEscapeKey = (evt) => (evt.key === 'Escape');


export {getRandomInt, validStrLen, getRandomArrayElement, isEscapeKey};
