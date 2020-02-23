import React from 'react';
import PropTypes from 'prop-types';

import { Stats } from './ProfileStats.styled';

const ProfileStats = ({ stats, smallV, ...props }) => (
  <Stats {...props}>
    {
      stats.map (({ name, value }) => (
        <Stats.elem key={name} small={smallV}>
          <h3>{value}</h3>
          <div>{name}</div>
        </Stats.elem>
      ))
    }
  </Stats>
);

ProfileStats.propTypes = {
  stats: PropTypes.arrayOf (PropTypes.shape ({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType ([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
  smallV: PropTypes.bool,
};

ProfileStats.defaultProps = {
  smallV: false,
};

export default ProfileStats;
