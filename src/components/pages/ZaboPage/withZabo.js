import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotFound } from 'pages';

import { getZabo } from 'store/reducers/zabo';

const withZabo = (WrappedComponent, isPrivate = false) => (props) => {
  const dispatch = useDispatch ();
  const { zaboId } = props;

  useEffect (() => {
    dispatch (getZabo (zaboId));
  }, [zaboId]);

  const zaboImmutable = useSelector (state => state.getIn (['zabo', 'zabos', zaboId]));
  const zabo = useMemo (() => (zaboImmutable ? zaboImmutable.toJS () : null), [zaboImmutable]);
  if (!zabo) return null;
  if (zabo.error) return <NotFound />;
  if (isPrivate && !zabo.isMyZabo) return <NotFound />;
  return <WrappedComponent {...props} zabo={zabo} />;
};

export default withZabo;
