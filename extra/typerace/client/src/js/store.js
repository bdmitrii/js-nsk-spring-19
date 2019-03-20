function createStore() {
  let state = {};

  let listeners = [];

  const setState = newState => {
    state = {
      ...state,
      ...newState
    };

    listeners.forEach(listener => listener());
  };

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const clearListeners = () => {
    listeners = [];
  };

  return {
    setState,
    getState,
    subscribe,
    clearListeners
  };
}

export default createStore;
