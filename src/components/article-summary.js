const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      animation: fadein 0.2s ease-out;
      border: 1px solid var(--grey-color);
      border-radius: 8px;
      display: block;
      margin-top: 16px;
      max-height: 384px;
      overflow: hidden;
      padding: 16px;
    }

    :host(:hover) {
      cursor: pointer;
      transition: background 0.2s ease-out, box-shadow 0.2s ease-out;
      background: var(--grey-color-hover);
      box-shadow: 0 1px 2px 0 rgba(60,64,67,0.30), 0 1px 3px 1px rgba(60,64,67,0.15);
    }

    #title {
      font-family: Nunito, Roboto, Helvetica, Arial, sans-serif;
    }

    @keyframes fadein {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
  <h2 id="title"><slot name="title"></slot></h2>
  <p><slot name="summary"></slot></p>
`;

class ArticleSummary extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  _onClick() {
    const href = this.getAttribute('href');
    window.open(href);
  }
}

customElements.define('article-summary', ArticleSummary);
