const DEFAULT_DELAY = 500;

const getRandomPosNeg = () => (Math.random() - 0.5);

const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const isEscapeKey = (evt) => (evt.key === 'Escape');

function debounce (callback, timeoutDelay = DEFAULT_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInt, getRandomPosNeg, isEscapeKey, debounce};
