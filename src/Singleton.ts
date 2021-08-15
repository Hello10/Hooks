import React from 'react';

export type SingletonOptions<State> = {
  state?: Partial<State> | (()=> Partial<State>);
  [k: string]: unknown;
}

export class Singleton<State> {
  private static instance: any;
  protected state: State;
  protected options: SingletonOptions<State>;
  protected listeners: ((state: State)=> void)[];

  static use<State> (options: SingletonOptions<State> = {}): Singleton<State> {
    if (!this.instance) {
      this.instance = new this(options);
    }
    const {instance} = this;
    const [, setState] = React.useState<State>();
    React.useEffect(()=> {
      let is_mounted = true;
      function setStateIfMounted (state: State) {
        if (is_mounted) {
          setState(state);
        }
      }
      instance.addListener(setStateIfMounted);
      return ()=> {
        is_mounted = false;
        instance.removeListener(setStateIfMounted);
      };
    }, []);
    return instance;
  }

  constructor (options: SingletonOptions<State> = {}) {
    if ((this.constructor as typeof Singleton).instance) {
      throw new Error("Don't call singleton constructor directly");
    }

    this.options = options;
    this.listeners = [];

    let state = {};
    const {state: o_state} = options;
    if (o_state) {
      if (typeof o_state === 'function') {
        state = o_state();
      } else {
        state = o_state;
      }
    }

    this.state = this.initialize(state);
  }

  initialize (state: Partial<State>): State {
    return state as State;
  }

  setState (state: Partial<State>): void {
    this.state = {
      ...this.state,
      ...state
    };

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  addListener (listener: (state: any)=> void): void {
    this.listeners.push(listener);
  }

  removeListener (listener: (state: any)=> void): void {
    this.listeners = this.listeners.filter((l)=> l !== listener);
  }
}

export default Singleton;
