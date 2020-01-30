import PropTypes from 'prop-types';

export const ZaboType = {
  title: PropTypes.string,
  owner: PropTypes.shape ({
    name: PropTypes.string,
  }),
  description: PropTypes.string,
  category: PropTypes.arrayOf (PropTypes.string),
  photos: PropTypes.arrayOf (PropTypes.shape ({
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string,
  })),
  views: PropTypes.number,
  createdAt: PropTypes.string,
  endAt: PropTypes.string,
  isLiked: PropTypes.bool,
  isPinned: PropTypes.bool,
};

export const GroupType = {
  name: PropTypes.string,
  profilePhoto: PropTypes.string,
  stats: PropTypes.shape ({ // TODO: Generate stats in server
    zaboCount: PropTypes.number,
    followerCount: PropTypes.number,
    recentUploadDate: PropTypes.string,
  }),
};

export const UserType = {
  email: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
  profilePhoto: PropTypes.string,
  backgroundPhoto: PropTypes.string,
  birthday: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  studentId: PropTypes.string,
  koreanName: PropTypes.string,
  boards: PropTypes.arrayOf (PropTypes.shape ({
    pinsCount: PropTypes.number,
    pins: PropTypes.array,
  })),
  currentGroup: PropTypes.oneOfType ([
    PropTypes.shape (GroupType),
    PropTypes.string,
  ]),
  groups: PropTypes.arrayOf (
    PropTypes.oneOfType ([
      PropTypes.shape (GroupType),
      PropTypes.string,
    ]),
  ),
  stats: PropTypes.shape ({ // TODO: Change shape from server
    likesCount: PropTypes.number,
    followingsCount: PropTypes.number,
  }),
};
