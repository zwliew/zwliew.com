import { deepFreeze } from './utils.js';

const LAYOUTS = deepFreeze({
  blog: ({title, summary}) => `
    <article class="list-item">
      <h1>${title}</h1>
      <p>${summary}</p>
    </article>
  `,
  projects: ({name, tagline, description, href}) => `
    <article class="list-item" data-href="${href}">
      <h1>${name} - ${tagline}</h1>
      <p>${description}</p>
    </article>
  `,
});
const DATA = deepFreeze({
  url: 'https://zwliew.netlify.com/data/',
  types: {
    about: 'about.json',
    projects: 'projects.json',
    blog: 'blog.json',
  },
});

/**
 * Fetches the data for a page
 */
async function fetchData(type) {
  if (!DATA.types.hasOwnProperty(type)) {
    console.warn(`Type ${type} is invalid.`);
    return null;
  }

  try {
    const res = await fetch(`${DATA.url}${DATA.types[type]}`);
    const json = await res.json();
    return json[type];
  } catch (err) {
    console.warn(`Failed to fetch data for ${type}.`);
    return null;
  }
}

/**
 * Returns an HTML string of the layout of the page body
 */
function layout(page, data) {
  if (data === null || data === undefined) {
    console.warn(`Data ${data} is invalid`);
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
export default async function buildPage({ route, rootEl }) {
  if (route === 'about') return; // TODO: Build the about page

  if (!(rootEl instanceof HTMLElement)) {
    console.warn(`rootEl ${rootEl} is invalid.`);
    return;
  }

  const data = await fetchData(route);
  if (data === null) {
    return;
  }

  const parentEl = rootEl.getElementsByClassName('page-body')[0];
  parentEl.innerHTML = layout(route, data);
};
