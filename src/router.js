import { fetchData, TYPES } from './data.js';

const ROUTES = Object.freeze({
  home: {
    title: 'Home',
    path: '/',
    display: 'flex',
  },
  blog: {
    title: 'Blog',
    path: '/blog',
    display: 'block',
  },
  projects: {
    title: 'Projects',
    path: '/projects',
    display: 'block',
  },
  about: {
    title: 'About',
    path: '/about',
    display: 'block',
  },
});

function makeRouteVisible(route, sectionEls) {
  sectionEls.forEach((el) => {
    if (el.id !== route) {
      el.style.display = 'none';
    } else {
      el.style.display = ROUTES[route].display;
    }
  });
}

function handlePopState({state}) {
  if (state === undefined) {
    console.warn(`State ${state} is invalid.`);
    return;
  }
  this.document.title = `Zhao Wei - ${ROUTES[state].title}`;
  makeRouteVisible(state, this.sectionEls);
}

export default class Router {
  constructor(document, history, window) {
    this.sectionEls = [];
    this.document = document;
    this.history = history;

    window.addEventListener('popstate', handlePopState.bind(this));
  }

  init() {
    Object.keys(ROUTES)
      .map(name => this.document.getElementById(name))
      .forEach(section => this.sectionEls.push(section));
  }

  navigate(route, replaceState) {
    if (!(route in ROUTES)) {
      console.warn(`Route '${route}' does not exist; redirecting to home.`);
      route = 'home';
    }

    const details = ROUTES[route];
    this.document.title = `Zhao Wei - ${details.title}`;
    makeRouteVisible(route, this.sectionEls);
    if (replaceState) {
      this.history.replaceState(route, details.title, details.path);
    } else {
      this.history.pushState(route, details.title, details.path);
    }
  }
}