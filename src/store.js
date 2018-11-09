const store = {};

function set(key, value) {
  store[key] = value;
}

function get(key) {
  return store[key];
}

export default {
  set,
  get,
};
