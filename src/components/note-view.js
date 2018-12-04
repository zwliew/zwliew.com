import eventBus, { EVENTS } from '/src/eventBus.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    h1, h2 {
      font-family: Nunito, Roboto, Helvetica, Arial, sans-serif;
    }

    h1 {
      border-bottom: 2px solid var(--primary-color);
    }

    a {
      color: var(--secondary-color);
    }

    #not-found {
      display: none;
    }

    #note {
      animation: fadein 0.2s ease-out;
      display: none;
    }

    @keyframes fadein {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
  <route-nav></route-nav>
  <section id="not-found">
    <h1>Note not found</h1>
    <p>We couldn't find the note you're looking for.</p>
  </section>
  <article id="note">
  </article>
`;

class NoteView extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._note = this.shadowRoot.getElementById('note');
    this._notFound = this.shadowRoot.getElementById('not-found');

    eventBus.register(EVENTS.navigateLate, this._viewNote.bind(this));
  }

  async _viewNote({ params: { slug } }) {
    if (slug === undefined) return;

    this._note.style.display = 'none';
    this._notFound.style.display = 'none';

    const response = await fetch(`/res/data/notes/${slug}.md`);
    if (!response.ok) {
      this._notFound.style.display = 'block';
      return;
    }

    const markdown = await response.text();
    const html = marked(markdown);
    this._note.innerHTML = html;
    this._note.style.display = 'block';
  }
}

customElements.define('note-view', NoteView);
