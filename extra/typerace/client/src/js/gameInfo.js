import { store } from './game';

const messageElem = document.querySelector('.game__info-mes');
const userSpeedElem = document.querySelector('.game__info-speed');
const timerElem = document.querySelector('.game__info-time');

function render() {
  const {
    isGameEnded, isCountDownStarted, timeToStart, userSpeed, timeLeft, isSuccess
  } = store.getState();

  // (store.getState());

  if (isCountDownStarted) {
    messageElem.innerText = `Игра начнётся через ${timeToStart}`;
  } else {
    hideMessage();
  }

  if (isGameEnded) {
    messageElem.innerText = 'Время вышло!';
  }

  if (isSuccess) {
    messageElem.innerText = 'Поздравляем, вы успешно набрали текст!';
  }

  userSpeedElem.innerText = `Скорость: ${userSpeed} с/м`;
  timerElem.innerText = `Время: ${timeLeft}`;

  if (timeLeft === 5) {
    changeTimerElemColor('#f00');
    addPulseToElem(timerElem);
  }

  if (isGameEnded || isCountDownStarted) {
    clearTimer();
  }
}

function clearTimer() {
  changeTimerElemColor('#333');
  removePulseFromElem(timerElem);
}

function hideMessage() {
  messageElem.innerText = '';
}

function addPulseToElem(elem) {
  elem.classList.add('pulse-animation');
}

function removePulseFromElem(elem) {
  elem.classList.remove('pulse-animation');
}

function changeTimerElemColor(color) {
  timerElem.style.color = color;
}

export { render };
