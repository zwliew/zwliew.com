import { deepFreeze } from './utils.js';

const LAYOUTS = deepFreeze({
  blog: {
    title: 'h1',
    summary: 'p',
  },
  projects: {
    name: 'h1',
    tagline: 'h3',
    description: 'p',
  },
});
const DATA = deepFreeze({
  url: 'https://zwliew.netlify.com/data/',
  types: {
    about: 'about.json',
    projects: 'projects.json',
    blog: 'blog.json',
  },
});

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
  // TODO: Generate the HTML string
}

export default async function buildPage({ route, parentEl }) {
  if (route === 'about') return; // TODO: Build the about page

  if (!(parentEl instanceof HTMLElement)) {
    console.warn(`parentEl ${parentEl} is invalid.`);
    return;
  }

  const data = await fetchData(route);
  if (data === null) {
    return;
  }

  //parentEl.innerHTML = layout(route, data);
};
