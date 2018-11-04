import { deepFreeze } from './utils.js';
import eventBus, { EVENTS } from './eventBus.js';
import fetchData from './data.js';

const LAYOUTS = deepFreeze({
  blog: ({title, summary, id}) => (`
    <article class="list-item" data-href="data/blogs/${id}.md">
      <h1>${title}</h1>
      <p>${summary}…</p>
    </article>
  `),
  projects: ({name, tagline, description, href}) => (`
    <article class="list-item" data-href="${href}">
      <h1>${name}${tagline === undefined ? '' : ` - ${tagline}`}</h1>
      <p>${description}</p>
    </article>
  `),
});

/**
 * Returns an HTML string of the layout of the page body
 */
function layout(page, data) {
  if (data === null || data === undefined) {
    console.warn(`Data ${data} is invalid.`);
    return null;
  }
  if (!LAYOUTS.hasOwnProperty(page)) {
    console.warn(`Page ${page} does not exist.`);
    return null;
  }

  const layout = LAYOUTS[page];
  return data.map(datum => layout(datum)).reduce((acc, cur) => acc + cur);
}

/**
 * Fetches and formats the data for the body of a page before displaying it
 */
export default async function buildPage({ page, rootEl }) {
  if (!(rootEl instanceof HTMLElement)) {
    console.warn(`rootEl ${rootEl} is invalid.`);
    return;
  }

  const data = await fetchData(page);
  if (data === null) {
    return;
  }

  const htmlString = layout(page, data);
  if (htmlString == null) {
    return;
  }

  const parentEl = rootEl.getElementsByClassName('page-body')[0];
  parentEl.innerHTML = htmlString;

  eventBus.post(EVENTS.pageBuilt, { page });
};
