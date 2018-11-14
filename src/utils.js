/**
 * Deep freezes an object by recursively freezing its properties
 */
export function deepFreeze(obj) {
  if (typeof obj !== 'object') {
    return;
  }
  Object.getOwnPropertyNames(obj).forEach((name) => {
    if (typeof obj[name] === 'object') {
      deepFreeze(obj[name]);
    }
  });
  Object.freeze(obj);
  return obj;
}

/**
 * Returns true if the object `obj` is a string
 */
export function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

export function isDayTime(date = new Date()) {
  const hours = date.getHours();
  return hours >= 7 && hours < 19;
}
