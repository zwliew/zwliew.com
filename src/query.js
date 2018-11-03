class Element {
  constructor(document, selector) {
    this.elements = document.querySelectorAll(selector);
    this.events = {};
  }

  get(index) {
    if (index === undefined) {
      return this.elements;
    }
    return this.elements[index];
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
  const d = document; 
  return function(selector) {
    return new Element(d, selector);
  }
}
