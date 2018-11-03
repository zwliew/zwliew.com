import query from './query.js';

{ // Global block scope
const $ = query(document);

// Routing
const sections = []; // Populate when window has loaded
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

function navigate(route, replaceState) {
  if (!(route in routes)) {
    console.warn(`Route '${route}' does not exist; redirecting to home.`);
    route = 'home';
  }

  const details = routes[route];
  document.title = `Zhao Wei - ${details.title}`;
  makeRouteVisible(route);
  if (replaceState) {
    history.replaceState(route, details.title, details.path);
  } else {
    history.pushState(route, details.title, details.path);
  }
}

window.addEventListener('popstate', ({state}) => {
  if (state === undefined) {
    console.warn(`State ${state} is invalid.`);
    return;
  }
  document.title = `Zhao Wei - ${routes[state].title}`;
  makeRouteVisible(state);
});

window.addEventListener('load', () => {
  Object.keys(routes)
    .map(name => $(`#${name}`).get(0))
    .forEach(section => sections.push(section));

  // Start at whatever valid URL is entered, otherwise at home.
  navigate(`${window.location.pathname.replace(/^\/|\/$/g, '')}`, true);

  // Home
  $('#home-social-github').on('click', () => window.open('https://github.com/zwliew'));
  $('#home-social-email').on('click', () => window.open('mailto:zhaoweiliew@gmail.com'));
  $('#home-social-medium').on('click', () => window.open('https://medium.com/@zwliew'));
  $('#home-nav-blog').on('click', () => navigate('blog'));
  $('#home-nav-projects').on('click', () => navigate('projects'));
  $('#home-nav-about').on('click', () => navigate('about'));

  // Page header
  $('.page-header-blog').on('click', () => navigate('blog', true));
  $('.page-header-projects').on('click', () => navigate('projects', true));
  $('.page-header-about').on('click', () => navigate('about', true));
  $('.page-header-back').on('click', () => history.back());

  // Projects
  $('#projects .list-item').get().forEach(item => (
    item.addEventListener('click', () => window.open(item.dataset.href))
  ));
});
} // Global block scope
