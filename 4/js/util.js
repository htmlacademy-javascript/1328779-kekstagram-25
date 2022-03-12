
const getRandomInt = (min, max) => (Math.round(Math.random()*(max+1-min)+min));

const validStrLen = (str, maxLen) => (str.length <= maxLen);

const getRandomArrayElement = (elements) => (elements[getRandomInt(0, elements.length - 1)]);

export {getRandomInt, validStrLen, getRandomArrayElement};
