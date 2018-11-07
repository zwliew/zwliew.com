import q from './query.js';
import { ROUTES } from './router.js';
import eventBus, { EVENTS } from './eventBus.js';

function navigate(route) {
  eventBus.post(EVENTS.navigate, { route });
}

function setUpEventListeners({ route }) {
  switch (route) {
    case ROUTES.projects:
    case ROUTES.blog:
      q(`#${route} .list-item`).forEach(item => (
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

q('.expandable-content-header').click((ev) =>  {
  const parentEl = ev.target.parentElement;
  const style = parentEl.style;
  const iconEls = parentEl.getElementsByClassName('expandable-content-header-icon');
  if (style.maxHeight === 'none') {
    Array.from(iconEls).forEach(el => (
      el.style.display = el.dataset.icon.endsWith('down') ? 'inline' : 'none'
    ));
    style.maxHeight = '80px';
  } else {
    Array.from(iconEls).forEach(el => (
      el.style.display = el.dataset.icon.endsWith('up') ? 'inline' : 'none'
    ));
    style.maxHeight = 'none';
  }
});
