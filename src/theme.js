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
function switchTheme(theme) {
  curTheme = theme;
  document.body.toggleAttribute('switching-theme');
  document.body.dataset.theme = theme;
  setTimeout(() => document.body.toggleAttribute('switching-theme'), 300);
}

eventBus.register(EVENTS.switchTheme, ({theme}) => switchTheme(theme));
