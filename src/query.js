class Element {
  constructor(selector, document) {
    this.events = {};
    if (selector instanceof HTMLElement) {
      this.elements = [selector];
      console.log(selector);
    } else {
      this.elements = document.querySelectorAll(selector);
    }
  }

  get(index) {
    if (index === undefined) {
      return this.elements;
    }
    return this.elements[index];
  }

  forEach(callback) {
    this.elements.forEach((el, index, arr) => callback(new Element(el), index, arr));
  }

  dataset(key, value) {
    if (value === undefined) {
      if (key === undefined) {
        return this.elements[0].dataset;
      }
      return this.elements[0].dataset[key];
    }
    this.elements.forEach(el => el.dataset[key] = value);
  }

  get innerHTML() {
    return this.elements[0].innerHTML;
  }

  set innerHTML(htmlString) {
    this.elements.forEach(el => el.innerHTML = htmlString);
  }

  on(event, handler) {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
    this.elements.forEach(el => el.addEventListener(event, handler));
  }

  off(event, handler) {
    if (handler === undefined) {
      // Remove all handlers
      this.events[event].forEach(fn => (
        this.elements.forEach(el => el.removeEventListener(event, fn))
      ));
      this.events[event] = [];
    } else {
      this.elements.forEach(el => el.removeEventListener(event, handler));
      this.events[event] = this.events[event].filter(fn => fn !== handler);
    }
  }
}

export default function query(document) {
  return function(selector) {
    return new Element(selector, document);
  }
}
