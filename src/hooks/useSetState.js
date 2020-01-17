import { useState } from 'react';

export default function useSetState (initialForm) {
  const [state, setStateInternal] = useState (initialForm);
  const setState = (obj) => {
    setStateInternal ({ ...state, ...obj });
  };
  const onChange = e => {
    setState ({
      [e.target.name]: e.target.value,
    });
  };
  return [state, setState, onChange];
}
