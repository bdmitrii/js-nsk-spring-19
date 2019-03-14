function createStore() {
  let state = {};

  const listeners = [];

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
      listeners.filter(l => l !== listener);
    };
  };

  return {
    setState,
    getState,
    subscribe
  };
}

export default createStore;
