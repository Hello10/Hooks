import React, {useReducer} from 'react';

export function useStateBlob<State> (initial: State): [State, React.Dispatch<State>] {
  return useReducer((state: State, delta: Partial<State>)=> {
    return {
      ...state,
      ...delta
    };
  }, initial);
}

export default useStateBlob;
