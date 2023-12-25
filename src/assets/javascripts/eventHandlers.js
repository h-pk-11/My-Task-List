export default {
  on(eventName, handler, action) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = {
        actions: [],
        renders: [],
        events: [],
      };
    }

    if (action === "actions") {
      this._eventHandlers[eventName].actions.push(handler);
    } else if (action === "renders") {
      this._eventHandlers[eventName].renders.push(handler);
    } else {
      this._eventHandlers[eventName].events.push(handler);
    }
  },

  off(eventName, handler, action) {
    const handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;

    if (action === "actions") {
      for (let i = 0; i < handlers.actions.length; i++) {
        if (handlers.actions[i] === handler) {
          handlers.actions.splice(i--, 1);
        }
      }
    } else if (action === "renders") {
      for (let i = 0; i < handlers.renders.length; i++) {
        if (handlers.renders[i] === handler) {
          handlers.renders.splice(i--, 1);
        }
      }
    } else {
      for (let i = 0; i < handlers.events.length; i++) {
        if (handlers.events[i] === handler) {
          handlers.events.splice(i--, 1);
        }
      }
    }
  },

  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return undefined;
    }

    let result;
    this._eventHandlers[eventName].actions.forEach((action) => {
      result = action(...args);
    });

    this._eventHandlers[eventName].renders.forEach((render) => {
      render();
    });

    this._eventHandlers[eventName].events.forEach((event) => {
      event();
    });

    return result;
  },
};
