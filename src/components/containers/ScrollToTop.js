import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ScrollToTop = ({ updateWithPath }) => {
  const { route } = useParams ();
  const { pathname } = useLocation ();
  useEffect (() => {
    window.scrollTo (0, 0);
  }, [route]);
  useEffect (() => {
    if (updateWithPath) window.scrollTo (0, 0);
  }, [updateWithPath, pathname]);
  return null;
};

export default ScrollToTop;
