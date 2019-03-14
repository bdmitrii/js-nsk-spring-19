function getRandomText({ type = 'paragraph', num = '1', format = 'json' } = {}) {
  const baseURL = 'https://fish-text.ru/';
  const method = 'get';

  const URL = `${baseURL}${method}?format=${format}&type=${type}&number=${num}`;

  return fetch(URL).then(res => res.json());
}

function timer({
  period = 1000, ticksToStop = Infinity, onTicksEnd, onPause
}) {
  const listeners = [];

  let timerId;

  let tickCount = 0;

  let stopped = false;

  function tick() {
    if (tickCount === ticksToStop) {
      if (onTicksEnd) {
        onTicksEnd();
      }
      pause();
      stopped = true;
      return;
    }

    listeners.forEach(listener => {
      listener({ tickCount, period, ticksToStop });
    });

    tickCount += 1;
  }

  function start() {
    tick();
    timerId = setTimeout(function run() {
      tick();

      if (stopped) {
        return;
      }
      timerId = setTimeout(run, period);
    }, period);
  }

  function pause() {
    if (onPause) {
      onPause();
    }
    clearTimeout(timerId);
  }

  function stop() {
    clearTimeout(timerId);
  }

  function add(listener) {
    listeners.push(listener);
  }

  function getTicksToStop() {
    return ticksToStop;
  }

  return {
    start,
    pause,
    stop,
    add,
    getTicksToStop
  };
}

function typedTextLen(words, curWordNum) {
  return words.filter((...args) => args[1] < curWordNum).reduce((len, word) => len + word.length + 1, 0);
}

export { getRandomText, timer, typedTextLen };
