export function debounce(f, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => f(...args), delay);
  };
}

