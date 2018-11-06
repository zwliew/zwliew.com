import eventBus, { EVENTS } from './eventBus.js';
import { deepFreeze } from './utils.js';

export const ROUTES = deepFreeze({
  home: 'home',
  blog: 'blog',
  projects: 'projects',
  about: 'about',
});
const ROUTE_INFO = deepFreeze({
  [ROUTES.home]: {
    title: 'Home',
    path: '/',
    display: 'flex',
  },
  [ROUTES.blog]: {
    title: 'Blog',
    path: '/blog',
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
  if (state === undefined) {
    console.warn(`State ${state} is invalid.`);
    return;
  }
  document.title = `Zhao Wei - ${ROUTE_INFO[state].title}`;
  makeRouteVisible(state, this.sectionEls);
}

class Router {
  constructor() {
    window.addEventListener('popstate', handlePopState.bind(this));
    this.sectionEls = Object.keys(ROUTES)
      .map(name => document.getElementById(name));
  }

  /**
   * Navigates to a page
   */
  navigate(route, replaceState) {
    if (!ROUTES.hasOwnProperty(route)) {
      if (route.trim() !== '') {
        console.warn(`Route '${route}' does not exist; redirecting to home.`);
      }
      route = ROUTES.home;
    }

    const details = ROUTE_INFO[route];
    document.title = `Zhao Wei - ${details.title}`;
    makeRouteVisible(route, this.sectionEls);
    if (replaceState) {
      history.replaceState(route, details.title, details.path);
    } else {
      history.pushState(route, details.title, details.path);
    }
    eventBus.post(EVENTS.navigate, {
      page: route,
      rootEl: this.sectionEls.filter(el => el.id === route)[0],
    });
  }
}

const router = new Router();
export default router;
