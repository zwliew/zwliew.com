import eventBus, { EVENTS } from './eventBus.js';
import { deepFreeze } from './utils.js';

const ROUTES = [
  {
    name: 'home',
    path: /^\/*home\/*$|^\/*$/,
    title: 'Home',
    display: 'flex',
  },
  {
    name: 'notes',
    path: /^\/*notes\/*$/,
    title: 'Notes',
    display: 'block',
  },
  {
    name: 'projects',
    path: /^\/*projects\/*$/,
    title: 'Projects',
    display: 'block',
  },
  {
    name: 'about',
    path: /^\/*about\/*$/,
    title: 'About me',
    display: 'block',
  },
  {
    name: 'noteView',
    path: /^\/*notes\/+([\w-]+)\/*$/,
    title: 'Note view',
    display: 'block',
    params: [ 'slug' ],
  },
  {
    name: '404',
    path: /^\/*404\/*$/,
    title: 'Page not found',
    display: 'block',
  },
];

function handlePopState({ state }) {
  if (state === null) return;
  eventBus.post(EVENTS.navigate, {
    path: state,
    history: null,
  });
}

function updateDOM({ path, title, display }) {
  document.title = title;
  sectionEls.forEach(el =>
    el.style.display = path.test(el.dataset.path) ? display : 'none');
}

function updateHistory({ state, title, url, action }) {
  switch (action) {
    case 'replace':
      history.replaceState(state, title, url);
      break;
    case 'push':
      history.pushState(state, title, url);
      break;
  }
}

function routeFor(path) {
  for (let route of ROUTES) {
    const matches = path.match(route.path);
    if (matches) return { route, matches };
  }
  return {
    route: ROUTES[ROUTES.length - 1],
    matches: [],
  };
}

function navigate({ path, history = 'push' }) {
  const { route, matches } = routeFor(path);

  // Construct a mapping of key: val pairs for route params
  const params = matches.slice(1)
    .reduce((acc, curVal, curIndex) => ({
      ...acc,
      [route.params[curIndex]]: curVal,
    }), {});

  // Display the route and update the browser history
  updateDOM(route);
  updateHistory({
    state: path, // We don't really have any state right now, just the URL
    title: route.title,
    url: path,
    action: history,
  });

  // TODO: Re-evaluate the need to pass `params`.
  //       They could probably be obtained `from location.pathname`.
  eventBus.post(EVENTS.navigateLate, {
    name: route.name,
    path: route.path,
    params,
    rootEl: sectionEls.filter(el => route.path.test(el.dataset.path))[0],
  });
}

const sectionEls = [...document.getElementsByClassName('route')];

addEventListener('popstate', handlePopState);
eventBus.register(EVENTS.navigate, navigate);
