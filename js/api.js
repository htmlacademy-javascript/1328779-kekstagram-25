const URL_GET = 'https://25.javascript.pages.academy/kekstagram/data';
const URL_SEND = 'https://25.javascript.pages.academy/kekstagram';

const createLoader = (onSuccess, onError) => () =>
  fetch(
    URL_GET,
    {
      method: 'GET',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err.message);
    });


const sendPhoto = (onSuccess, onError, body) => {
  fetch(
    URL_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {createLoader, sendPhoto};
