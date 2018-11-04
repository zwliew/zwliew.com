import { deepFreeze } from './utils.js';

export const EVENTS = deepFreeze({
  navigate: 'navigate',
});

class EventBus {
  constructor() {
    this.subscribers = {};
  }

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
