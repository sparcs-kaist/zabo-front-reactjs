import { useState, useRef } from 'react';

export default function useSetState (initialForm) {
  const [state, setStateInternal] = useState (initialForm);
  const setState = (param) => {
    if (typeof param === 'function') {
      setStateInternal (prevState => ({ ...prevState, ...param (prevState) }));
      return;
    }
    setStateInternal ({ ...state, ...param });
  };
  const onChange = e => {
    setState ({
      [e.target.name]: e.target.value,
    });
  };
  return [state, setState, onChange];
}
