import { deepFreeze, isDayTime } from './utils.js';
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

export function getPreferredTheme() {
  // Is system dark mode enabled?
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEMES.night;
  }
  // Otherwise, is it day or night time?
  return isDayTime() ? THEMES.day : THEMES.night;
}

eventBus.register(EVENTS.switchTheme,
  ({ theme, transition }) => switchTheme(theme, transition));
