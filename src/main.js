import query from './query.js';
import router, { ROUTES } from './router.js';
import eventBus, { EVENTS } from './eventBus.js';
import buildPage from './page.js';

{ // Global block scope
const q = query(document);

function setUpEventListeners({ page }) {
  switch (page) {
    case ROUTES.projects:
    case ROUTES.blog:
      q(`#${page} .list-item`).forEach(item => (
        item.click(() => window.open(item.dataset('href')))
      ));
      break;
    default:
      break;
  }
}

window.addEventListener('load', () => {
  eventBus.register(EVENTS.navigate, buildPage);
  eventBus.register(EVENTS.pageBuilt, setUpEventListeners);

  // Start at whatever valid URL is entered, otherwise at home.
  router.init(document, history, window);
  router.navigate(window.location.pathname.replace(/^\/|\/$/g, ''), true);

  // Home
  q('.home-social').click(ev => window.open(ev.target.dataset.href));
  q('#home-nav-blog').click(() => router.navigate(ROUTES.blog));
  q('#home-nav-projects').click(() => router.navigate(ROUTES.projects));
  q('#home-nav-about').click(() => router.navigate(ROUTES.about));

  // Page header
  q('.page-header-nav').click(ev => router.navigate(ev.target.dataset.href, true));
  q('.page-header-back').click(() => history.back());
});
} // Global block scope
