import { deepFreeze } from './utils.js';

export const EVENTS = deepFreeze({
  navigate: 'navigate',
  pageBuilt: 'pageBuilt',
});

class EventBus {
  constructor() {
    this.subscribers = {};
  }

  /**
   * Register a handler to be called whenever a specific event occurs
   */
  register(event, handler) {
    if (!(handler instanceof Function)) {
      console.warn(`Handler ${handler} is invalid.`);
      return;
    }
    if (!EVENTS.hasOwnProperty(event)) {
      console.warn(`Event ${event} does not exist.`);
      return;
    }
    if (!this.subscribers.hasOwnProperty(event)) {
      this.subscribers[event] = [handler];
    } else {
      this.subscribers[event].push(handler);
    }
  }

  /**
   * Posts an event and notifies its subscribers
   */
  post(event, data) {
    if (!EVENTS.hasOwnProperty(event)) {
      console.warn(`Event ${event} does not exist.`);
      return;
    }
    this.subscribers[event].forEach(handler => handler(data));
  }
}

const eventBus = new EventBus();
export default eventBus;
