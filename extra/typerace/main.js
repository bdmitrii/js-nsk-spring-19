// const textElem = document.querySelector('.text');
const inputElem = document.querySelector('.user-input');

const completedTextElem = document.querySelector('.completed-text');
const curCharElem = document.querySelector('.cur-char');
const remainingTextElem = document.querySelector('.remaining-text');
const userSpeedElem = document.querySelector('.user-speed');
const timerElem = document.querySelector('.timer');

let state = {
  text: '',
  curRightIndex: 0,
  curIndex: 0,
  newWordIndex: 0,
  timeRemaining: 0,
  userSpeed: 30,
  isGameOver: false
};

function render() {
  const {
    text,
    curRightIndex,
    userSpeed,
    timeRemaining
  } = state;

  completedTextElem.innerText = text.slice(0, curRightIndex);
  curCharElem.innerText = text.charAt(curRightIndex);
  remainingTextElem.innerText = text.slice(curRightIndex + 1);

  userSpeedElem.innerText = `Скорость: ${userSpeed} символов в минуту`;
  timerElem.innerText = `Время: ${timeRemaining}`;
}

function setState(newState) {
  state = {
    ...state,
    ...newState
  };

  render();
}

function setRandomText() {
  const baseURL = 'https://fish-text.ru/';
  const type = 'sentence';
  const num = '1';
  const format = 'json';
  const method = 'get';

  const URL = `${baseURL}${method}?format=${format}&type=${type}&number=${num}`;

  fetch(URL)
    .then(res => res.json())
    .then(({ text }) => setState({ text }));
}

function updateSpeed(time, newTime) {
  const { curRightIndex } = state;
  const SPEED_UPDATE_GAP = 3;

  if ((time - newTime) % SPEED_UPDATE_GAP === 0 && time - newTime !== 0) {
    const speed = Math.round(curRightIndex * 60 / (time - newTime));

    setState({ userSpeed: speed });
  }
}

function timer() {
  const { timeRemaining: allTime } = state;

  let timerId;

  setTimeout(function tick() {
    const { timeRemaining: newTime, isGameOver } = state;

    setState({ timeRemaining: newTime });
    updateSpeed(allTime, newTime);

    if (newTime === 0 || isGameOver) {
      clearTimeout(timerId);

      const customAlert = window.confirm;
      const message = isGameOver ? 'Вы успешно набрали текст! Сыграть еще раз?' : 'Время истекло, начать новую игру?';
      const answer = customAlert(message);

      if (answer) {
        newGame();
      }

      return;
    }

    setState({ timeRemaining: newTime - 1 });

    timerId = setTimeout(tick, 1000);
  }, 1000);
}

function newGame() {
  setState({
    text: '',
    curRightIndex: 0,
    curIndex: 0,
    newWordIndex: 0,
    timeRemaining: 30,
    userSpeed: 0,
    isGameOver: false
  });


  timer();
  render();
  setRandomText();

  inputElem.style.backgroundColor = null;
  inputElem.value = '';
  inputElem.removeAttribute('disabled');
  inputElem.focus();
}

function keyDownHandler(e) {
  if (e.keyCode !== 8) {
    return;
  }

  const { curIndex, curRightIndex, newWordIndex } = state;

  if (curIndex > curRightIndex) {
    setState({ curIndex: curIndex - 1 });
  }

  if (curIndex <= curRightIndex && curIndex > newWordIndex) {
    setState({
      curIndex: curIndex - 1,
      curRightIndex: curRightIndex - 1
    });
  }

  if (state.curIndex === state.curRightIndex) {
    inputElem.style.backgroundColor = null;
  }
}

function keyPressHandler(e) {
  const {
    curRightIndex,
    text,
    curIndex
  } = state;

  const curChar = e.keyCode;


  if (curRightIndex === text.length - 1) {
    inputElem.setAttribute('disabled', true);
    inputElem.value = '';

    setState({ isGameOver: true });
  }

  setState({ curIndex: curIndex + 1 });

  if (curIndex !== curRightIndex || curChar !== text.charCodeAt(curRightIndex)) {
    inputElem.style.backgroundColor = 'red';
    return;
  }

  if (curChar === ' '.charCodeAt(0)) {
    setState({ newWordIndex: curRightIndex + 1 });
    setTimeout(() => { inputElem.value = ''; }, 0);
  }

  setState({ curRightIndex: curRightIndex + 1 });
}

inputElem.addEventListener('keypress', keyPressHandler);
inputElem.addEventListener('keydown', keyDownHandler);

newGame();
