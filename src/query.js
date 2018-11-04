class Element {
  constructor(selector, document) {
    this.events = {};
    if (selector instanceof HTMLElement) {
      this.elements = [selector];
    } else {
      this.elements = document.querySelectorAll(selector);
    }
  }

  /**
   * Returns the element at a specific index of the elements array
   */
  get(index) {
    if (index === undefined) {
      return this.elements;
    }
    return this.elements[index];
  }

  /**
   * Applies a callback to each of the elements
   */
  forEach(callback) {
    this.elements.forEach((el, index, arr) => callback(new Element(el), index, arr));
  }

  /**
   * Get: returns a data attribute of the first element
   * Set: sets a data attribute of all the elements
   */
  dataset(key, value) {
    if (value === undefined) {
      if (key === undefined) {
        return this.elements[0].dataset;
      }
      return this.elements[0].dataset[key];
    }
    this.elements.forEach(el => el.dataset[key] = value);
  }

  /**
   * Returns the innerHTML of the first element
   */
  get innerHTML() {
    return this.elements[0].innerHTML;
  }

  /**
   * Sets the innerHTML of all the elements
   */
  set innerHTML(htmlString) {
    this.elements.forEach(el => el.innerHTML = htmlString);
  }

  /**
   * Sets up an event handler
   */
  on(event, handler) {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
    this.elements.forEach(el => el.addEventListener(event, handler));
  }

  /**
   * Removes an event handler
   */
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

  /**
   * Sets up a 'click' event handler
   */
  click(handler) {
    this.on('click', handler);
  }
}

export default function query(document) {
  return function(selector) {
    return new Element(selector, document);
  }
}
