import eventBus, { EVENTS } from './eventBus.js';
import { deepFreeze } from './utils.js';

export const ROUTES = deepFreeze({
  home: 'home',
  notes: 'notes',
  projects: 'projects',
  about: 'about',
});
const ROUTE_INFO = deepFreeze({
  [ROUTES.home]: {
    title: 'Home',
    path: '/',
    display: 'flex',
  },
  [ROUTES.notes]: {
    title: 'Notes',
    path: '/notes',
    display: 'block',
  },
  [ROUTES.projects]: {
    title: 'Projects',
    path: '/projects',
    display: 'block',
  },
  [ROUTES.about]: {
    title: 'About',
    path: '/about',
    display: 'block',
  },
});

function handlePopState({ state }) {
  if (state === null) return;
  updateDOM(state, ROUTE_INFO[state].title);
}

function updateDOM(route, title) {
  document.title = title;
  sectionEls.forEach((el) => {
    if (el.dataset.route === route) {
      el.style.display = ROUTE_INFO[route].display;
    } else {
      el.style.display = 'none';
    }
  });
}

function updateHistory(route, title, path, type) {
  if (type === 'replace') {
    history.replaceState(route, title, path);
  } else if (type === 'push') {
    history.pushState(route, title, path);
  }
}

function navigate({ route, history = 'push' }) {
  if (!ROUTES.hasOwnProperty(route)) route = ROUTES.home;
  const { title, path } = ROUTE_INFO[route];
  updateDOM(route, title);
  updateHistory(route, title, path, history);
  eventBus.post(EVENTS.navigateLate, {
    route,
    rootEl: sectionEls.filter(el => el.dataset.route === route)[0],
  });
}

const sectionEls = [...document.getElementsByClassName('route')];

addEventListener('popstate', handlePopState);
eventBus.register(EVENTS.navigate, navigate);
