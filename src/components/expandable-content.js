const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      border: 1px solid var(--grey-color);
      border-radius: 8px;
      margin-top: 16px;
      max-height: 80px;
      overflow: hidden;
    }

    :host([expanded]) {
      max-height: none;
    }

    :host([expanded]) > #header {
      background: var(--grey-color);
    }

    #header {
      align-items: center;
      display: flex;
      height: 80px;
      padding: 8px 16px;
    }

    #header:hover {
      cursor: pointer;
      transition: background 0.2s ease-out;
      background: var(--grey-color-light);
    }

    #header-icon {
      font-size: 1.5rem;
    }

    #header-title {
      font-family: Nunito, Roboto, Helvetica, Arial, sans-serif;
    }

    #body {
      padding: 0 16px;
    }
  </style>

  <header id="header">
    <slot id="header-icon" name="icon"></slot>
    <h2 id="header-title"><slot name="title"></slot></h2>
  </header>
  <section id="body">
    <slot></slot>
  </section>
`;

class ExpandableContent extends HTMLElement {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._header = this.shadowRoot.getElementById('header');
  }

  connectedCallback() {
    this._header.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this._header.removeEventListener('click', this._onClick);
  }

  _onClick() {
    this.toggleAttribute('expanded');
  }
}

customElements.define('expandable-content', ExpandableContent);
