import React from 'react';
import PropTypes from 'prop-types';

import withZabo from 'hoc/withZabo';
import { ZaboType } from 'lib/propTypes';

import ZaboCardL from './ZaboCardL';
import ZaboCardM from './ZaboCardM';

const ZaboCard = ({ zabo, size }) => {
  if (size === 'large') return <ZaboCardL zabo={zabo} />;
  return <ZaboCardM zabo={zabo} />;
};

ZaboCard.propTypes = {
  zabo: ZaboType.isRequired,
  size: PropTypes.oneOf (['medium', 'large']),
};

ZaboCard.defaultProps = {
  size: 'medium',
};

export default withZabo (ZaboCard, false, false);
