const timestamps = {};

function start(name) {
  if (timestamps[name] !== undefined) {
    console.error(`A benchmark is already started for ${name}`);
    return;
  }
  const now = performance.now();
  timestamps[name] = now;
}

function stop(name) {
  const prev = timestamps[name];
  if (prev === undefined) {
    return null;
  }
  const now = performance.now();
  const delta = now - prev;
  console.log(`${name}: ${delta}`);
  delete timestamps[name];
  return delta;
}

export default {
  start,
  stop,
};
