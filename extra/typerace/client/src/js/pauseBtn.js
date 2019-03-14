import { store } from './game';

const btnElem = document.querySelector('.btn-pause');
const btnContent = btnElem.querySelector('.btn__content');

function addPauseBtnListener() {
  btnElem.addEventListener('click', () => {
    const { isGamePaused } = store.getState();

    if (isGamePaused) {
      btnContent.innerText = '||';
      startGameTimer();

      store.setState({ isGamePaused: false });
    } else {
      btnContent.innerHTML = '&#9658;';
      pauseGameTimer();
    }
  });
}

function pauseGameTimer() {
  const { timers } = store.getState();
  const { gameTimer } = timers;

  gameTimer.pause();
}

function startGameTimer() {
  const { timers } = store.getState();
  const { gameTimer } = timers;

  gameTimer.start();
}

function enable() {
  btnElem.removeAttribute('disabled');
}

function disable() {
  btnElem.disabled = true;
  btnContent.innerText = '||';
}

function render() {
  const { isGameStarted } = store.getState();

  if (isGameStarted) {
    // console.log(isGameStarted);
    enable();
  } else {
    disable();
  }
}

export { addPauseBtnListener, render };
