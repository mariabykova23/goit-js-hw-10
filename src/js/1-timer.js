'use strict';

import icon from '../img/bi_x-octagon-2.svg';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnClick = document.querySelector('[data-start]');
const inputW = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSecs = document.querySelector('[data-seconds]');

let selectedDates = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selected) {
    const curDate = new Date();
    if (curDate >= selected[0]) {
      iziToast.show({
        position: 'topRight',
        iconUrl:icon,
        imageWidth: '24px',
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        messageSize: '24px',
        messageLineHeight: '1.6',
        backgroundColor: '#EF4040',
        timeout: 115000,
        displayMode: 2,
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
      });
      btnClick.disabled = true;
    } else {
      btnClick.disabled = false;
      selectedDates = selected[0];
    }
  },
});

class Timer {
  constructor(tick) {
    this.tick = tick;
    this.intervalId = null;
    this.selectedDates = null;
  }
  start(selectedDates) {
    this.selectedDates = selectedDates;
    if (!this.selectedDates) {
      return;
    }

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const difference = this.selectedDates.getTime() - startTime;
      const time = this.convertMs(difference);

      this.tick(time);

      if (
        time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0
      ) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer(onTick);

btnClick.addEventListener('click', () => {
  timer.start(selectedDates);
  btnClick.disabled = true;
  inputW.disabled = true;
});

function onTick({ days, hours, minutes, seconds }) {
  const formatedDays = formataddLeadingZero(days);
  const formatedHours = formataddLeadingZero(hours);
  const formatedMinutes = formataddLeadingZero(minutes);
  const formatedSeconds = formataddLeadingZero(seconds);
  timerDays.textContent = formatedDays;
  timerHours.textContent = formatedHours;
  timerMinutes.textContent = formatedMinutes;
  timerSecs.textContent = formatedSeconds;
}

function formataddLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

/////////////

const weekName = document.querySelectorAll('.flatpickr-weekday');

weekName.forEach(day => {
  const fullText = day.textContent.trim();
  const firstTwoLetters = fullText.substring(0, 2);
  day.textContent = firstTwoLetters;
});
