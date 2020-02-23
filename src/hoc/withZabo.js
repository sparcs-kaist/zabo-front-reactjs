import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { NotFound } from 'pages';

import { getZabo } from 'store/reducers/zabo';

const withZabo = (WrappedComponent, isPrivate = false, fetch = true) => {
  const Sub = (props) => {
    const dispatch = useDispatch ();
    const { zaboId } = props;

    useEffect (() => {
      if (fetch) dispatch (getZabo (zaboId));
    }, [zaboId]);

    const zaboImmutable = useSelector (state => state.getIn (['zabo', 'zabos', zaboId]));
    const zabo = useMemo (() => (zaboImmutable ? zaboImmutable.toJS () : null), [zaboImmutable]);
    if (!zabo) return null;
    if (zabo.error) return <NotFound />;
    if (isPrivate && !zabo.isMyZabo) return <NotFound />;
    return <WrappedComponent {...props} zabo={zabo} />;
  };
  Sub.propTypes = {
    zaboId: PropTypes.string.isRequired,
  };
  return Sub;
};

export default withZabo;
