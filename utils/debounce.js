/**
 * 
 * This debounce function is used to prevent multiple calls to a function
 * @param {Function} callback 
 * @param {Number} delay 
 * @returns {Function}
 */
const debounce = (callback, delay) => {
  let timeout;

  if (delay) {
    delay = 1000;
  }

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default debounce;
