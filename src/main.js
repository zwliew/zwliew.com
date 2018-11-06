import q from './query.js';
import { ROUTES } from './router.js';
import eventBus, { EVENTS } from './eventBus.js';

function navigate(route) {
  eventBus.post(EVENTS.navigate, { route });
}

function setUpEventListeners({ page }) {
  switch (page) {
    case ROUTES.projects:
    case ROUTES.blog:
      q(`#${page} .list-item`).forEach(item => (
        item.click(() => open(item.dataset('href')))
      ));
      break;
    default:
      break;
  }
}

eventBus.register(EVENTS.routeDisplayed, setUpEventListeners);

navigate(location.pathname.replace(/^\/|\/$/g, '') || ROUTES.home);

// Home
q('.home-social').click(ev => open(ev.target.dataset.href));
q('#home-nav-blog').click(() => navigate(ROUTES.blog));
q('#home-nav-projects').click(() => navigate(ROUTES.projects));
q('#home-nav-about').click(() => navigate(ROUTES.about));

// Page header
q('.page-header-nav').click(ev => navigate(ev.target.dataset.href));
