import { getRandomText, timer } from './utils';
import createStore from './store';
import { TIME_TO_LEN_RATION, SPEED_UPDATE_GAP, TIME_TO_START } from './constants';
import { initInput, addListener as addInputListener } from './input';

const startBtnElem = document.querySelector('.game__controls-start');

const store = createStore();

function initState() {
  store.setState({
    text: '',
    words: [],
    curWordNum: 0,
    timeLeft: 0,
    userSpeed: 0,
    isGameOver: false,
    isGameStarted: false,
    timers: []
  });
}

async function initGame() {
  const { text } = await getRandomText({ type: 'sentance' });

  const timeLeft = Math.round(text.length * TIME_TO_LEN_RATION);
  const words = text.split(' ');

  const prevState = store.getState();
  const { timers } = prevState;

  timers.forEach(t => t.stop());

  const gameTimer = timer(1000, timeLeft);

  gameTimer.add(decreaseTime, 1000);
  gameTimer.add(updateSpeed, 3000);

  store.setState({
    text,
    words,
    timeLeft,
    timers: gameTimer,
    isGameOver: false,
    userSpeed: 0,
    curWordNum: 0
  });
}

function initUI() {
  addInputListener();
  startBtnElem.addEventListener('click', onStart);
}

async function onStart() {
  initInput();
  await initGame();
}

function renderMessage(text) {
  messageElem.innerText = text;
}

function updateSpeed(time, newTime) {
  // const { curRightIndex } = ;
  // if ((time - newTime) % SPEED_UPDATE_GAP === 0 && time - newTime !== 0) {
  //   const speed = Math.round((curRightIndex * 60) / (time - newTime));
  //   setState({ userSpeed: speed });
  // }
}

function decreaseTime() {
  const state = store.getState();
  const { timeLeft } = state;

  store.setState({ timeLeft: timeLeft - 1 });
}

async function newGame() {
  initState();
  initUI();
}

export { newGame, store };
