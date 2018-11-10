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
  if (!THEMES.hasOwnProperty(theme)) {
    console.warn(`Theme ${theme} does not exist.`);
    return;
  }
  curTheme = theme;
  document.body.dataset.theme = theme;
}

{
const hours = (new Date()).getHours();
switchTheme(hours >= 7 && hours < 19 ? THEMES.day : THEMES.night);

eventBus.register(EVENTS.switchTheme, ({theme}) => switchTheme(theme));
}
