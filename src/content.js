import { deepFreeze } from './utils.js';
import eventBus, { EVENTS } from './eventBus.js';

const CONTENTS = deepFreeze({
  url: 'data/',
  routes: {
    about: 'about.json',
    projects: 'projects.json',
    notes: 'notes.json',
  },
});
const LAYOUTS = deepFreeze({
  notes: ({ title, summary, id }) => (`
    <article-summary href="notes/${id}">
      <span slot="title">${title}</span>
      <span slot="summary">${summary}</span>
    </article-summary>
  `),
  projects: ({ name, tagline, description, href }) => (`
    <article-summary href="${href}">
      <span slot="title">${name}${tagline === undefined ? '' : ` - ${tagline}`}</span>
      <span slot="summary">${description}</span>
    </article-summary>
  `),
  education: ({ name, location, period, href }) => (`
    <p><a${href ? ` href="${href}"` : ''}>${name}, ${location} (${period})</a></p>
  `),
  activities: ({ name, period, href }) => (`
    <p><a${href ? ` href="${href}"` : ''}>${name} (${period})</a></p>
  `),
  achievements: ({ name, award, href }) => (`
    <p><a${href ? ` href="${href}"` : ''}>${name} - ${award}</a></p>
  `),
});

const cached = new Map();

/**
 * Fetches the data for a page
 */
async function fetchContent(route) {
  if (cached.has(route)) return cached.get(route);

  try {
    const res = await fetch(`${CONTENTS.url}${CONTENTS.routes[route]}`);
    const json = await res.json();
    cached.set(route, json);
    return json;
  } catch (_) {
    return null;
  }
}

/**
 * Returns an HTML string of the layout of the page body
 */
function layout(content) {
  const htmlStrings = {};
  Object.keys(content).forEach((key) => {
    const layout = LAYOUTS[key];
    htmlStrings[key] = content[key].map(
      datum => layout(datum)).reduce((acc, cur) => acc + cur);
  });
  return htmlStrings;
}

/**
 * Fetches and formats the data for the body of a route before displaying it
 */
async function displayRoute({ name, params, rootEl }) {
  if (!CONTENTS.routes.hasOwnProperty(name)) return;

  const content = await fetchContent(name);
  if (content === null) return;

  const htmlStrings = layout(content);
  const parentEls = rootEl.getElementsByClassName('route-content');
  Array.from(parentEls).forEach((el) => {
    const contentKey = el.dataset.content;
    if (el.innerHTML !== htmlStrings[contentKey]) {
      el.innerHTML = htmlStrings[contentKey];
    }
  })
};

eventBus.register(EVENTS.navigateLate, data => displayRoute(data));
