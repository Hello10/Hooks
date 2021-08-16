(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.reactHooks = {}, global.react));
}(this, (function (exports, React) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static use(options) {
      if (!this.instance) {
        this.instance = new this(options);
      }

      const {
        instance
      } = this;
      const [, setState] = React__default['default'].useState();
      React__default['default'].useEffect(() => {
        // We need to explicitly track mount state to avoid
        // setting state after a consumer is unmounted
        let is_mounted = true;

        function setStateIfMounted(state) {
          if (is_mounted) {
            setState(state);
          }
        } // We add a listener with each consumer's call
        // to .use, and remove on umount


        instance.addListener(setStateIfMounted);
        return () => {
          is_mounted = false;
          instance.removeListener(setStateIfMounted);
        };
      }, []);
      return instance;
    }

    constructor(options) {
      this.state = void 0;
      this.options = void 0;
      this.listeners = void 0;

      if (this.constructor.instance) {
        throw new Error("Don't call singleton constructor directly");
      }

      this.options = options;
      this.listeners = []; // State can be either state object to set or function
      // that returns the iniital state to be set

      let state = {};
      const {
        state: o_state
      } = this.options;

      if (o_state) {
        if (typeof o_state === 'function') {
          state = o_state();
        } else {
          state = o_state;
        }
      }

      this.state = this.initialize(state);
    } // Child classes can override .initialize for state initialization


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
      const {
        listeners
      } = this;

      if (!listeners.includes(listener)) {
        this.listeners = [...listeners, listener];
      }
    }

    removeListener(listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
    }

  }
  Singleton.instance = void 0;

  function useStateBlob(initial) {
    return React.useReducer((state, delta) => {
      return _extends({}, state, delta);
    }, initial);
  }

  exports.Singleton = Singleton;
  exports.useStateBlob = useStateBlob;

})));
//# sourceMappingURL=index.umd.js.map
