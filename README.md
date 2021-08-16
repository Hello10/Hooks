# Hooks
React Hooks

## Singleton

Excerpted from [example app]("./test/example/")

### Implementation of `useTheme` hook using `Singleton`
```
import {Singleton} from '@hello10/react-hooks';

export interface ThemeState {
  mode: ThemeMode;
  primary: string;
}

export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

export interface ThemeOptions extends SingletonOptions<ThemeState> {
  state: ()=> Partial<ThemeState>;
  upper: (s: string)=> string;
}

class Theme extends Singleton<ThemeState, ThemeOptions> {
  initialize (state: Partial<ThemeState>) {
    console.log('initializing...', state);
    return {
      mode: ThemeMode.light,
      primary: '#000000',
      ...state
    };
  }

  toggleMode = ()=> {
    const {mode} = this.state;
    const new_mode = mode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    console.log(`changing to ${new_mode} mode`);
    this.setState({mode: new_mode});
  };

  set primary (primary) {
    this.setState({primary});
  }

  get primary (): string {
    return this.state.primary;
  }

  get mode (): ThemeMode {
    return this.state.mode;
  }

  isDark () {
    return (this.mode === ThemeMode.dark);
  }

  isLight () {
    return (this.mode === ThemeMode.light);
  }

  get name () {
    return this.options.upper(this.mode);
  }
}

export function useTheme (): Theme {
  return Theme.use<ThemeState, ThemeOptions, Theme>({
    state: ()=> {
      return {
        primary: '#663399'
      };
    },
    upper: (s: string)=> s.toUpperCase()
  });
}

export default useTheme;
```

### Consumption of `useTheme` hook
```
import React from 'react';

import useTheme from './useTheme';

export default function Button () {
  const theme = useTheme();
  return (
    <button
      onClick={theme.toggleMode}
      style={{
        borderColor: theme.primary,
        color: theme.primary
      }}
    >
      toggle
    </button>
  );
}
```