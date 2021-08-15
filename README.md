# Hooks
React Hooks

## Singleton

Excerpted from [example app]("./test/example/")

### Implementation of `useTheme` hook using `Singleton`
```
import {Singleton} from '@hello10/react-hooks';

export interface ThemeState {
  mode: Mode;
  primary: string;
}

enum Mode {
  light = 'light',
  dark = 'dark'
}

class Theme extends Singleton<ThemeState> {
  initialize (state: Partial<ThemeState>) {
    console.log('initializing...', state);
    return {
      mode: Mode.light,
      primary: '#000000',
      ...state
    };
  }

  toggleMode = ()=> {
    const {mode} = this.state;
    const new_mode = mode === Mode.light ? Mode.dark : Mode.light;
    console.log(`changing to ${new_mode} mode`);
    this.setState({mode: new_mode});
  };

  set primary (primary) {
    this.setState({primary});
  }

  get primary () {
    return this.state.primary;
  }

  get mode () {
    return this.state.mode;
  }

  isDark () {
    return (this.state.mode === Mode.dark);
  }

  isLight () {
    return (this.state.mode === Mode.light);
  }

  get name () {
    return this.options.upper(this.state.mode);
  }
}

export default function useTheme (): Singleton<ThemeState> {
  return Theme.use<ThemeState>({
    state: ()=> {
      return {
        primary: '#663399'
      };
    },
    upper: (s: string)=> s.toUpperCase()
  });
}
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