import { store } from './game';
import { typedTextLen } from './utils';

const inputElem = document.querySelector('.user-input');

function renderError() {
  inputElem.classList.add('input_type_error');
}

function hideError() {
  inputElem.classList.remove('input_type_error');
}

function clear() {
  inputElem.value = '';
}

function disable() {
  inputElem.disabled = true;
}

function enable() {
  inputElem.disabled = null;
}

function focus() {
  inputElem.focus();
}

function isInputCorrect(word, value) {
  const regExp = new RegExp(`^(${value})`, 'g');

  return !!word.match(regExp);
}

function onInput(event) {
  const { target } = event;
  const { curWordNum, words, text } = store.getState();

  const word = `${words[curWordNum]} `;
  const lastWord = `${words[curWordNum]}`;

  const isCorrect = isInputCorrect(word, target.value);

  if (isCorrect) {
    hideError();
  } else {
    renderError();
  }

  if (typedTextLen(words, curWordNum) + lastWord.length === text.length && isCorrect && lastWord.length === target.value.length) {
    const { timers } = store.getState();

    timers.gameTimer.stop();
    store.setState({ isSuccess: true, isGameEnded: true, isGameStarted: false });
    doneWord();
  }

  if (target.value[target.value.length - 1] === ' ' && isCorrect) {
    doneWord();
  }
}

function doneWord() {
  const { curWordNum } = store.getState();

  store.setState({ curWordNum: curWordNum + 1 });
  clear();
}

function addListener() {
  inputElem.addEventListener('input', onInput);
}

function render() {
  const { isGameStarted, isGamePaused, isGameEnded } = store.getState();

  if (isGameStarted && !isGamePaused) {
    enable();
    focus();
  }

  if (!isGameStarted || isGameEnded || isGamePaused) {
    disable();
  }

  if (isGameEnded) {
    clear();
  }
}

export { addListener, render };
