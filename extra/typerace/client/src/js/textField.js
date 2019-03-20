import { store } from './game';
import { typedTextLen } from './utils';

const correctTextElem = document.querySelector('.correct-text');
const currentTextElem = document.querySelector('.current-word');
const remainingTextElem = document.querySelector('.remaining-text');

function render() {
  const { curWordNum, words, text } = store.getState();

  const curWord = words[curWordNum];
  const curWordLen = (curWord || '').length;
  const curCharNum = typedTextLen(words, curWordNum);

  currentTextElem.innerText = text.slice(curCharNum, curCharNum + curWordLen + 1);
  correctTextElem.innerText = text.slice(0, curCharNum);
  remainingTextElem.innerText = text.slice(curCharNum + curWordLen + 1);
}

export { render };
