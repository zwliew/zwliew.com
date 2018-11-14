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

function makeRouteVisible(route, sectionEls) {
  sectionEls.forEach((el) => {
    if (el.id !== route) {
      el.style.display = 'none';
    } else {
      el.style.display = ROUTE_INFO[route].display;
    }
  });
}

function handlePopState({state}) {
  console.log(state)
  if (state === null) return;
  updateDOM(state, this.sectionEls, ROUTE_INFO[state].title);
}

function updateDOM(route, sectionEls, title) {
  document.title = `Zhao Wei - ${title}`;
  makeRouteVisible(route, sectionEls);
}

function updateHistory(route, title, path, type) {
  if (type === 'replace') {
    history.replaceState(route, title, path);
  } else if (type === 'push') {
    history.pushState(route, title, path);
  }
}

class Router {
  constructor() {
    this.sectionEls = Object.keys(ROUTES)
      .map(name => document.getElementById(name));
    window.addEventListener('popstate', handlePopState.bind(this));
    this.navigate(location.pathname.replace(/^\/|\/$/g, ''), 'replace');
    eventBus.register(EVENTS.navigate, ({ route }) => this.navigate(route));
  }

  /**
   * Navigates to a page
   */
  navigate(route, historyType = 'push') {
    if (!ROUTES.hasOwnProperty(route)) {
      if (route !== '') {
        console.warn(`Route '${route}' does not exist; redirecting to home.`);
      }
      route = ROUTES.home;
    }

    const { title, path } = ROUTE_INFO[route];
    updateDOM(route, this.sectionEls, title);
    updateHistory(route, title, path, historyType);
    eventBus.post(EVENTS.navigateLate, {
      route,
      rootEl: this.sectionEls.filter(el => el.id === route)[0],
    });
  }
}

const router = new Router();
export default router;
