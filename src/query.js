class Element {
  constructor(document, selector) {
    this.element = document.querySelector(selector);
  }

  get() {
    return this.element;
  }
}

export default function query(document) {
  const d = document; 
  return function(selector) {
    return new Element(d, selector);
  }
}
