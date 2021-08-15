import React, { useReducer } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

class Singleton {
  static use(options = {}) {
    if (!this.instance) {
      this.instance = new this(options);
    }

    const {
      instance
    } = this;
    const [, setState] = React.useState();
    React.useEffect(() => {
      let is_mounted = true;

      function setStateIfMounted(state) {
        if (is_mounted) {
          setState(state);
        }
      }

      instance.addListener(setStateIfMounted);
      return () => {
        is_mounted = false;
        instance.removeListener(setStateIfMounted);
      };
    }, []);
    return instance;
  }

  constructor(options = {}) {
    this.state = void 0;
    this.options = void 0;
    this.listeners = void 0;

    if (this.constructor.instance) {
      throw new Error("Don't call singleton constructor directly");
    }

    this.options = options;
    this.listeners = [];
    let state = {};
    const {
      state: o_state
    } = options;

    if (o_state) {
      if (typeof o_state === 'function') {
        state = o_state();
      } else {
        state = o_state;
      }
    }

    this.state = this.initialize(state);
  }

  initialize(state) {
    return state;
  }

  setState(state) {
    this.state = _extends({}, this.state, state);

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

}
Singleton.instance = void 0;

function useStateBlob(initial) {
  return useReducer((state, delta) => {
    return _extends({}, state, delta);
  }, initial);
}

export { Singleton, useStateBlob };
//# sourceMappingURL=index.esm.js.map
