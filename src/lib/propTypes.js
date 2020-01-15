import PropTypes from 'prop-types';

export const ZaboType = {
  photos: PropTypes.arrayOf (PropTypes.shape ({
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string,
  })),
  title: PropTypes.string,
  endAt: PropTypes.string,
  owner: PropTypes.shape ({
    name: PropTypes.string,
  }),
};
