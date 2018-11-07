const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      border: 1px solid var(--grey-color);
      border-radius: 8px;
      max-height: 80px;
      margin-top: 16px;
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

    #body {
      padding: 0 16px;
    }
  </style>

  <header id="header">
    <slot id="header-icon" name="icon"></slot>
    <slot id="header-title" name="title"></slot>
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
