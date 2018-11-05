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
    secondaryColor: '#e1f5fe',
  },
  [THEMES.night]: {
    primaryColor: '#01579b',
    primaryColorDark: '#002f6c',
    secondaryColor: '#039be5',
  },
});

/**
 * Switches the theme colors for an element
 */
export default function switchTheme(element) {
  curTheme = curTheme === THEMES.day ? THEMES.night : THEMES.day;
  Object.entries(THEME_COLORS[curTheme])
    .map(([key, value]) => ['--'.concat(key.split(/(?=[A-Z])/).join('-').toLowerCase()), value])
    .forEach(([key, value]) => element.style.setProperty(key, value));
}
