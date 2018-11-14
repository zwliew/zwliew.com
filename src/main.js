import eventBus, { EVENTS } from './eventBus.js';

document.getElementById('home-nav').addEventListener('click', (event) => {
  const route = event.target.dataset.route;
  if (!route) return;
  eventBus.post(EVENTS.navigate, { route });
});
