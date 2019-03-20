import axios from 'axios';

import { getRandomText, timer, typedTextLen } from './utils';
import createStore from './store';
import { TIME_TO_LEN_RATION, SPEED_UPDATE_GAP, TICKS_TO_START } from './constants';
import { addListener as addInputListener, render as renderInput } from './input';
import { render as renderTextField } from './textField';
import { render as renderInfo } from './gameInfo';
import { addPauseBtnListener, render as renderPauseBtn } from './pauseBtn';

const startBtnElem = document.querySelector('.game__controls-start');

const store = createStore();

function render() {
  renderInfo();
  renderInput();
  renderPauseBtn();
  renderTextField();
}

function initState() {
  store.setState({
    text: '',
    words: [],
    curWordNum: 0,
    timeLeft: 0,
    timeToStart: 0,
    userSpeed: 0,
    isCountDownStarted: false,
    isGamePaused: false,
    isGameStarted: false,
    isGameEnded: false,
    timers: {},
    isSuccess: false
  });
}

async function initGame() {
  let { text } = await getRandomText({ type: 'sentance' });

  text = text.slice(0, 80).trim();

  const timeLeft = Math.round(text.length * TIME_TO_LEN_RATION);
  const words = text.split(' ');

  stopTimers();

  const startTimer = timer({
    period: 1000,
    ticksToStop: TICKS_TO_START,
    onTicksEnd: () => {
      store.setState({ isCountDownStarted: false, isGameStarted: true });
      gameTimer.start();
    }
  });

  startTimer.add(({ tickCount }) => {
    store.setState({ timeToStart: TICKS_TO_START - tickCount });
  });
  startTimer.start();

  const gameTimer = timer({
    period: 1000,
    ticksToStop: timeLeft,
    onTicksEnd: () => {
      updateSpeed({ tickCount: timeLeft, period: 1000 });
      store.setState({ isGameEnded: true, isGamePaused: false, isGameStarted: false });
    },
    onPause: () => {
      store.setState({ isGamePaused: true });
    }
  });

  gameTimer.add(decreaseTime);
  gameTimer.add(updateSpeed);

  store.setState({
    text,
    words,
    timeLeft,
    timers: { gameTimer, startTimer },
    userSpeed: 0,
    curWordNum: 0,
    isGameEnded: false,
    isCountDownStarted: true,
    isGamePaused: false,
    isGameStarted: false,
    isSuccess: false
  });
}

function stopTimers() {
  const { timers } = store.getState();

  if (!Object.keys(timers).length) {
    return;
  }

  for (const t in timers) {
    if (Object.prototype.hasOwnProperty.call(timers, t)) {
      timers[t].stop();
    }
  }
}

function initUI() {
  addPauseBtnListener();
  addInputListener();
  startBtnElem.addEventListener('click', onStart);

  store.subscribe(render);
}

async function onStart() {
  await initGame();
  startBtnElem.querySelector('.btn__content').innerText = 'Играть заного';

  const unsubscribe = store.subscribe(() => {
    const { isGameEnded } = store.getState();

    if (!isGameEnded) {
      return;
    }

    const { userSpeed } = store.getState();

    axios.patch('/api/stat', {
      newSpeed: userSpeed
    });

    unsubscribe();
  });
}

function updateSpeed({ tickCount, period }) {
  if ((tickCount * period) % SPEED_UPDATE_GAP === 0) {
    const { words, curWordNum } = store.getState();
    const rightTextLen = typedTextLen(words, curWordNum);

    const speed = Math.round((rightTextLen * 60) / (tickCount || 1));

    store.setState({ userSpeed: speed });
  }
}

function decreaseTime() {
  const state = store.getState();
  const { timeLeft } = state;

  if (timeLeft !== 0) {
    store.setState({ timeLeft: timeLeft - 1 });
  }
}

function newGame() {
  initState();
  initUI();
}

export { newGame, store };
