import { deepFreeze } from './utils.js';

const THEMES = deepFreeze({
  day: 'day',
  night: 'night',
});
let curTheme = THEMES.day;

/**
 * Switches the theme colors for an element
 */
function switchTheme(theme, element) {
  if (!THEMES.hasOwnProperty(theme)) {
    console.warn(`Theme ${theme} does not exist.`);
    return;
  }
  curTheme = theme;
  element.dataset.theme = theme;
}

const hours = (new Date()).getHours();
switchTheme(hours >= 7 && hours < 19 ? THEMES.day : THEMES.night, document.body);
