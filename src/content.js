import { deepFreeze } from './utils.js';
import eventBus, { EVENTS } from './eventBus.js';

const DATA = deepFreeze({
  url: 'data/',
  routes: {
    about: 'about.json',
    projects: 'projects.json',
    blog: 'blog.json',
  },
});
const LAYOUTS = deepFreeze({
  blog: ({ title, summary, id }) => (`
    <article class="list-item" data-href="data/blogs/${id}.md">
      <h1>${title}</h1>
      <p>${summary}…</p>
    </article>
  `),
  projects: ({ name, tagline, description, href }) => (`
    <article class="list-item" data-href="${href}">
      <h1>${name}${tagline === undefined ? '' : ` - ${tagline}`}</h1>
      <p>${description}</p>
    </article>
  `),
  education: ({ name, location, period, href }) => (`
    <p><a href="${href}">${name}, ${location} (${period})</a></p>
  `),
  activities: ({ name, period, href }) => (`
    <p><a href="${href}">${name} (${period})</a></p>
  `),
  achievements: ({ name, award, href }) => (`
    <p><a href="${href}">${name} - ${award}</a></p>
  `),
});

/**
 * Fetches the data for a page
 */
async function fetchData(route) {
  if (!DATA.routes.hasOwnProperty(route)) {
    return null;
  }

  try {
    const res = await fetch(`${DATA.url}${DATA.routes[route]}`);
    return await res.json();
  } catch (err) {
    console.log(err)
    console.warn(`Failed to fetch data for ${route}.`);
    return null;
  }
}

/**
 * Returns an HTML string of the layout of the page body
 */
function layout(data) {
  if (data === null || data === undefined) {
    console.warn(`Data ${data} is invalid.`);
    return null;
  }

  const htmlStrings = {};
  Object.keys(data).forEach((key) => {
    const layout = LAYOUTS[key];
    htmlStrings[key] = data[key].map(datum => layout(datum)).reduce((acc, cur) => acc + cur);
  });

  return htmlStrings;
}

/**
 * Fetches and formats the data for the body of a route before displaying it
 */
async function displayRoute({ route, rootEl }) {
  if (!(rootEl instanceof HTMLElement)) {
    console.warn(`rootEl ${rootEl} is invalid.`);
    return;
  }

  const data = await fetchData(route);
  if (data === null) {
    return;
  }

  const htmlStrings = layout(data);
  if (htmlStrings == null) {
    return;
  }

  const parentEls = rootEl.getElementsByClassName('page-content');
  Array.from(parentEls).forEach((el) => {
    const contentKey = el.dataset.content;
    el.insertAdjacentHTML('beforeend', htmlStrings[contentKey]);
  })

  eventBus.post(EVENTS.routeDisplayed, { route });
};

eventBus.register(EVENTS.navigateLate, (data) => displayRoute(data));
