import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';

const ScrollToTop = ({ updateWithPath } : { updateWithPath : boolean }) => {
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

ScrollToTop.propTypes = {
  updateWithPath: PropTypes.bool,
};

ScrollToTop.defaultProps = {
  updateWithPath: false,
};

export default ScrollToTop;
