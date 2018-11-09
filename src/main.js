import q from './query.js';
import { ROUTES } from './router.js';
import eventBus, { EVENTS } from './eventBus.js';

function navigate(route) {
  eventBus.post(EVENTS.navigate, { route });
}

navigate(location.pathname.replace(/^\/|\/$/g, '') || ROUTES.home);

// Home
q('.home-social').click(ev => open(ev.target.dataset.href));
q('#home-nav-blog').click(() => navigate(ROUTES.blog));
q('#home-nav-projects').click(() => navigate(ROUTES.projects));
q('#home-nav-about').click(() => navigate(ROUTES.about));

// Page header
q('.page-nav-link').click(ev => navigate(ev.target.dataset.href));
