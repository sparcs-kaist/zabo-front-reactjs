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

export const GroupType = {
  name: PropTypes.string,
};

export const UserType = {
  email: PropTypes.string,
  username: PropTypes.string,
  profilePhoto: PropTypes.string,
  backgroundPhoto: PropTypes.string,
  birthday: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  studentId: PropTypes.string,
  koreanName: PropTypes.string,
  currentGroup: PropTypes.oneOf ([
    PropTypes.shape (GroupType),
    PropTypes.string,
  ]),
  groups: PropTypes.arrayOf (
    PropTypes.oneOf ([
      PropTypes.shape (GroupType),
      PropTypes.string,
    ]),
  ),
};
