const sections = [];
const routes = {
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
};

function makeRouteVisible(route) {
  for (let el of sections) {
    if (el.id !== route) {
      el.style.display = 'none';
    } else {
      el.style.display = routes[route].display;
    }
  }
}

export default class Router {
  constructor(window, document, history) {
    this.window = window;
    this.document = document;
    this.history = history;
  }

  init($) {
    this.window.addEventListener('popstate', ({state}) => {
      if (state === undefined) {
        console.warn(`State ${state} is invalid.`);
        return;
      }
      this.document.title = `Zhao Wei - ${routes[state].title}`;
      makeRouteVisible(state);
    });

    Object.keys(routes)
      .map(name => $(`#${name}`).get(0))
      .forEach(section => sections.push(section));
  }

  navigate(route, replaceState) {
    if (!(route in routes)) {
      console.warn(`Route '${route}' does not exist; redirecting to home.`);
      route = 'home';
    }

    const details = routes[route];
    this.document.title = `Zhao Wei - ${details.title}`;
    makeRouteVisible(route);
    if (replaceState) {
      this.history.replaceState(route, details.title, details.path);
    } else {
      this.history.pushState(route, details.title, details.path);
    }
  }
}
