import React from 'react';

export interface SingletonOptions<TState> {
  state?: Partial<TState> | (()=> Partial<TState>);
}

export class Singleton<TState, TOptions extends SingletonOptions<TState>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static instance: any;
  protected state: TState;
  protected options: TOptions;
  protected listeners: ((state: TState)=> void)[];

  static use<
    TState,
    TOptions extends SingletonOptions<TState>,
    TSingleton extends Singleton<TState, TOptions>
  > (options: TOptions): TSingleton {
    if (!this.instance) {
      this.instance = new this(options);
    }
    const {instance} = this;
    const [, setState] = React.useState<TState>();

    React.useEffect(()=> {
      // We need to explicitly track mount state to avoid
      // setting state after a consumer is unmounted
      let is_mounted = true;
      function setStateIfMounted (state: TState) {
        if (is_mounted) {
          setState(state);
        }
      }

      // We add a listener with each consumer's call
      // to .use, and remove on umount
      instance.addListener(setStateIfMounted);
      return ()=> {
        is_mounted = false;
        instance.removeListener(setStateIfMounted);
      };
    }, []);

    return instance;
  }

  constructor (options: TOptions) {
    if ((this.constructor as typeof Singleton).instance) {
      throw new Error("Don't call singleton constructor directly");
    }

    this.options = options;
    this.listeners = [];

    // State can be either state object to set or function
    // that returns the iniital state to be set
    let state = {};
    const {state: o_state} = this.options;
    if (o_state) {
      if (typeof o_state === 'function') {
        state = o_state();
      } else {
        state = o_state;
      }
    }

    this.state = this.initialize(state);
  }

  // Child classes can override .initialize for state initialization
  protected initialize (state: Partial<TState>): TState {
    return state as TState;
  }

  protected setState (state: Partial<TState>): void {
    this.state = {
      ...this.state,
      ...state
    };

    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  private addListener (listener: (state: TState)=> void): void {
    const {listeners} = this;
    if (!listeners.includes(listener)) {
      this.listeners = [...listeners, listener];
    }
  }

  private removeListener (listener: (state: TState)=> void): void {
    this.listeners = this.listeners.filter((l)=> l !== listener);
  }
}

export default Singleton;
