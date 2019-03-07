import { store } from './game';

const inputElem = document.querySelector('.user-input');

export function initInput() {
  inputElem.value = '';
  inputElem.removeAttribute('disabled');
  inputElem.classList.remove('input_type_error');
  inputElem.focus();
}

function renderError() {
  inputElem.classList.add('input_type_error');
}

function hideError() {
  inputElem.classList.remove('input_type_error');
}

function clearInput() {
  inputElem.value = '';
}

function isInputCorrect(word, value) {
  const regExp = new RegExp(`^(${value})`, 'g');

  return !!word.match(regExp);
}

function onInput(event) {
  const state = store.getState();

  const { target } = event;
  const { value } = target;
  const { curWordNum, words } = state;

  const word = `${words[curWordNum]} `;

  const isCorrect = isInputCorrect(word, value);

  if (isCorrect) {
    hideError();
  } else {
    renderError();
  }

  if (value[value.length - 1] === ' ' && isCorrect) {
    store.setState({ curWordNum: curWordNum + 1 });
    clearInput();
  }
}

function addListener() {
  inputElem.addEventListener('input', onInput);
}

export { addListener };
