import { useRef, useState } from "react";

export default function useSetState(initialForm) {
  const [state, setStateInternal] = useState(initialForm);
  const clone = { ...state };
  const setState = (param) => {
    if (typeof param === "function") {
      setStateInternal((prevState) => ({ ...prevState, ...param(prevState) }));
      return;
    }
    setStateInternal(Object.assign(clone, param));
  };
  const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };
  return [state, setState, onChange];
}
