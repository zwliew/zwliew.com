import eventBus, { EVENTS } from './eventBus.js';
import { deepFreeze } from './utils.js';

export const THEMES = deepFreeze({
  day: 'day',
  night: 'night',
});
let curTheme = THEMES.day;
const THEME_COLORS = deepFreeze({
  [THEMES.day]: {
    primaryColor: '#4fc3f7',
    primaryColorDark: '#0093c4',
    primaryColorLight: '#8bf6ff',
    secondaryColor: '#e1f5fe',
    textColor: '#000000de',
    primaryColorHover: '#0093c4', // primaryColorDark
    greyColorHover: '#eee', // greyColorLight
  },
  [THEMES.night]: {
    primaryColor: '#01579b',
    primaryColorDark: '#002f6c',
    primaryColorLight: '#58a5f0',
    secondaryColor: '#039be5',
    textColor: '#ffffffde',
    primaryColorHover: '#58a5f0', // primaryColorLight
    greyColorHover: '#a4a4a4', // greyColorDark
  },
});

/**
 * Switches the theme colors for an element
 */
export default function switchTheme(theme, element) {
  if (!THEMES.hasOwnProperty(theme)) {
    console.warn(`Theme ${theme} does not exist.`);
    return;
  }
  curTheme = theme;
  Object.entries(THEME_COLORS[curTheme])
    .map(([key, value]) => ['--'.concat(key.split(/(?=[A-Z])/).join('-').toLowerCase()), value])
    .forEach(([key, value]) => element.style.setProperty(key, value));
}
