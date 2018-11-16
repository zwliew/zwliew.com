import eventBus, { EVENTS } from '/src/eventBus.js';
import { curTheme, THEMES } from '/src/theme.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    #nav {
      display: flex;
      font-family: Nunito, Roboto, Helvetica, Arial, sans-serif;
      font-size: 1.1rem;
    }

    .nav-item:nth-of-type(n+2):not(:last-of-type)::before {
      content: '|';
      font-weight: normal;
      margin: 0 4px;
    }

    .link:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    .link[data-current] {
      cursor: auto;
      font-weight: bold;
      text-decoration: none;
    }

    .theme {
      background: var(--primary-color);
      border: 2px solid var(--grey-color);
      border-radius: 100%;
      display: inline-block;
      height: 24px;
      margin-left: auto;
      width: 24px;
    }

    .theme:hover {
      cursor: pointer;
    }
  </style>
  <nav id="nav">
    <span class="link nav-item" data-path="/home">home</span>
    <span class="link nav-item" data-path="/notes" >notes</span>
    <span class="link nav-item" data-path="/projects">projects</span>
    <span class="link nav-item" data-path="/about">about</span>
    <span class="nav-item theme"></span>
  </nav>
`;

class RouteNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._nav = this.shadowRoot.getElementById('nav');
    this._links = this._nav.getElementsByClassName('link');

    eventBus.register(EVENTS.navigateLate, this._updateCurrent.bind(this));
  }

  connectedCallback() {
    this._nav.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this._nav.removeEventListener('click', this._onClick);
  }

  _onClick(event) {
    if (event.target.hasAttribute('data-current')) {
      return;
    }
    if (event.target.className.includes('link')) {
      const path = event.target.dataset.path;
      eventBus.post(EVENTS.navigate, { path });
    } else {
      eventBus.post(EVENTS.switchTheme, {
        theme: curTheme === THEMES.day ? THEMES.night : THEMES.day
      });
    }
  }

  _updateCurrent({ path }) {
    for (let i = 0; i < this._links.length; i++) {
      const link = this._links[i];
      if (link.hasAttribute('data-current') ||
          path.test(link.dataset.path)) {
        link.toggleAttribute('data-current');
      }
    }
  }
}

customElements.define('route-nav', RouteNav);
