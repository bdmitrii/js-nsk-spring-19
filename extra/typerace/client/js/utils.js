function getRandomText({ type = 'paragraph', num = '1', format = 'json' } = {}) {
  const baseURL = 'https://fish-text.ru/';
  const method = 'get';

  const URL = `${baseURL}${method}?format=${format}&type=${type}&number=${num}`;

  return fetch(URL).then(res => res.json());
}

function timer({ period = 1000, ticksToStop = Infinity, onTicksEnd }) {
  const listeners = [];

  let timerId;

  let tickCount = 0;

  function tick() {
    timerId = setTimeout(tick, period);
    tickCount += 1;

    listeners.forEach(({ listener, listenerPeriod }) => {
      if ((tickCount * period) % listenerPeriod === 0) {
        onTicksEnd();
        listener();
      }
    });

    if (tickCount === ticksToStop) {
      stop();
    }
  }

  function start() {
    timerId = setTimeout(tick, period);
  }

  function stop() {
    clearTimeout(timerId);
  }

  function add(listener, listenerPeriod = 1000) {
    listeners.push({ listener, listenerPeriod });
  }

  return {
    start,
    stop,
    add
  };
}

export { getRandomText, timer };
