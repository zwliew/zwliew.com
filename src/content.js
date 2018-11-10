import { deepFreeze } from './utils.js';
import eventBus, { EVENTS } from './eventBus.js';
import store from './store.js';

const CONTENTS = deepFreeze({
  url: 'data/',
  routes: {
    about: 'about.json',
    projects: 'projects.json',
    blog: 'blog.json',
  },
});
const LAYOUTS = deepFreeze({
  blog: ({ title, summary, id }) => (`
    <article-summary href="data/blogs/${id}.md">
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

/**
 * Fetches the data for a page
 */
async function fetchContent(route) {
  const content = store.get(route);
  if (content !== undefined) {
    return content;
  }

  try {
    const res = await fetch(`${CONTENTS.url}${CONTENTS.routes[route]}`);
    const json = await res.json();
    store.set(route, json);
    return json;
  } catch (err) {
    console.warn(`Failed to fetch data for ${route}.`);
    return null;
  }
}

/**
 * Returns an HTML string of the layout of the page body
 */
function layout(content) {
  if (content === null) {
    console.warn(`Content ${content} is invalid.`);
    return null;
  }

  const htmlStrings = {};
  Object.keys(content).forEach((key) => {
    const layout = LAYOUTS[key];
    htmlStrings[key] = content[key].map(datum => layout(datum)).reduce((acc, cur) => acc + cur);
  });

  return htmlStrings;
}

/**
 * Fetches and formats the data for the body of a route before displaying it
 */
async function displayRoute({ route, rootEl }) {
  if (!CONTENTS.routes.hasOwnProperty(route)) {
    return;
  }

  if (!(rootEl instanceof HTMLElement)) {
    console.warn(`rootEl ${rootEl} is invalid.`);
    return;
  }

  const htmlStrings = layout(await fetchContent(route));
  if (htmlStrings === null) {
    return;
  }

  const parentEls = rootEl.getElementsByClassName('page-content');
  Array.from(parentEls).forEach((el) => {
    const contentKey = el.dataset.content;
    if (el.innerHTML !== htmlStrings[contentKey]) {
      el.innerHTML = htmlStrings[contentKey];
    }
  })
};

eventBus.register(EVENTS.navigateLate, (data) => displayRoute(data));
