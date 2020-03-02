import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setWindowSize } from 'store/reducers/app';

function getDimensions () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}

const WindowResizeListener = () => {
  const dispatch = useDispatch ();
  const handleResize = useCallback (() => {
    dispatch (setWindowSize (getDimensions ()));
  }, []);
  useEffect (() => {
    window.addEventListener ('optimizedResize', handleResize);
    return () => {
      window.removeEventListener ('optimizedResize', handleResize);
    };
  }, []);
  return null;
};

export default WindowResizeListener;
