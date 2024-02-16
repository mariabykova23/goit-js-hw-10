'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnSub = document.querySelector('button');
const inputNum = document.querySelector('input[type="number"]');
const fullfilState = document.querySelector(
  'input[type="radio"][value="fulfilled"]'
);
const form = document.querySelector('.form');

btnSub.addEventListener('click', event => {
  event.preventDefault();
  const delay = inputNum.value;
  const isFullfilled = fullfilState.checked;

  const promise = createPromise(delay, isFullfilled);

  promise
    .then(() => {
      iziToast.show({
        position: 'topRight',
        imageWidth: '24px',
        message: `✅ Fulfilled promise in ${delay} ms`,
        messageColor: '#FFFFFF',
        messageSize: '24px',
        messageLineHeight: '1.6',
        backgroundColor: 'lightGreen',
        timeout: 10000,
        displayMode: 2,
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
      });
    })
    .catch(() => {
      iziToast.show({
        position: 'topRight',
        message: `❌ Rejected promise in ${delay} ms`,
        messageColor: '#FFFFFF',
        messageSize: '24px',
        messageLineHeight: '1.6',
        backgroundColor: 'pink',
        timeout: 10000,
        displayMode: 2,
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
      });
    });

  form.reset();
});

function createPromise(delay, isFullfilled) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFullfilled) {
        resolve('Resolved');
      } else {
        reject('Rejected');
      }
    }, delay);
  });

  return promise;
}
