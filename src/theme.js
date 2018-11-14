import { deepFreeze } from './utils.js';
import eventBus, { EVENTS } from './eventBus.js';

export const THEMES = deepFreeze({
  day: 'day',
  night: 'night',
});
export let curTheme = THEMES.day;

/**
 * Switches the theme colors for an element
 */
function switchTheme(theme, transition = true) {
  curTheme = theme;
  if (transition) {
    document.body.toggleAttribute('switching-theme');
    setTimeout(() => document.body.toggleAttribute('switching-theme'), 300);
  }
  document.body.dataset.theme = curTheme;
}

eventBus.register(EVENTS.switchTheme,
  ({ theme, transition }) => switchTheme(theme, transition));
