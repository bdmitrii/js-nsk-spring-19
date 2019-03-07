import { store } from './game';

const correctTextElem = document.querySelector('.correct-text');
const currentTextElem = document.querySelector('.current-word');
const remainingTextElem = document.querySelector('.remaining-text');
const userSpeedElem = document.querySelector('.game__info-speed');
const timerElem = document.querySelector('.game__info-time');

function render() {
  const state = store.getState();

  const {
    text, words, curWordNum, userSpeed, timeLeft
  } = state;

  const curWord = words[curWordNum];
  const curWordLen = (curWord || '').length;
  const curCharNum = words.filter((...args) => args[1] < curWordNum).reduce((len, word) => len + word.length + 1, 0);

  currentTextElem.innerText = text.slice(curCharNum, curCharNum + curWordLen + 1);
  correctTextElem.innerText = text.slice(0, curCharNum);
  remainingTextElem.innerText = text.slice(curCharNum + curWordLen + 1);

  userSpeedElem.innerText = `Скорость: ${userSpeed} с/м`;
  timerElem.innerText = `Время: ${timeLeft}`;
}

store.subscribe(render);
