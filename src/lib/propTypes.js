import PropTypes from 'prop-types';

export const ZaboType = PropTypes.shape ({
  _id: PropTypes.string,
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
  schedules: PropTypes.arrayOf (PropTypes.shape ({
    title: PropTypes.string,
    startAt: PropTypes.string,
    endAt: PropTypes.string,
    type: PropTypes.string,
  })),
  isLiked: PropTypes.bool,
  isPinned: PropTypes.bool,
  isMyZabo: PropTypes.bool,
});

export const GroupType = PropTypes.shape ({
  _id: PropTypes.string,
  name: PropTypes.string,
  profilePhoto: PropTypes.string,
  stats: PropTypes.shape ({ // TODO: Generate stats in server
    zaboCount: PropTypes.number,
    followerCount: PropTypes.number,
    recentUploadDate: PropTypes.string,
  }),
  myRole: PropTypes.oneOf (['admin', 'editor']),
});

export const UserType = PropTypes.shape ({
  _id: PropTypes.string,
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
    GroupType,
    PropTypes.string,
  ]),
  groups: PropTypes.arrayOf (
    PropTypes.oneOfType ([
      GroupType,
      PropTypes.string,
    ]),
  ),
  stats: PropTypes.shape ({ // TODO: Change shape from server
    likesCount: PropTypes.number,
    followingsCount: PropTypes.number,
  }),
});
