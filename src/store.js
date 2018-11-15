const store = new Map();

function set(key, value) {
  store.set(key, value);
}

function get(key) {
  return store.get(key);
}

export default {
  set,
  get,
};
