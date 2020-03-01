import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';

import ChannelService from 'lib/channel_io';
import { isAuthedSelector } from 'lib/utils';

const ChannelTalk = ({ match }) => {
  const { search } = useLocation ();
  const { top } = match.params;
  const isAuthenticated = useSelector (isAuthedSelector);
  const infoImmutable = useSelector (state => state.getIn (['auth', 'info']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);
  const {
    _id,
    username,
    koreanName,
    groups,
    flags,
    email,
    profilePhoto,
  } = info;

  useEffect (() => {
    // if (process.env.NODE_ENV !== 'production') return;
    if (top === 'settings') {
      ChannelService.shutdown ();
      return;
    }
    const { code, state } = queryString.parse (search);
    if (code && state) return;
    const settings = {
      pluginKey: '5fe8c634-bcbd-4499-ba99-967191a2ef77',
    };
    if (isAuthenticated) {
      if (!_id) return;
      Object.assign (settings, {
        userId: _id,
        profile: {
          name: username,
          koreanName,
          avatarUrl: profilePhoto,
          groups: groups.map (group => group.name).join (', '),
          flags: flags.join (', '),
          email,
        },
      });
    }
    ChannelService.boot (settings);
  }, [search, isAuthenticated, infoImmutable, top]);
  return null;
};

export default ChannelTalk;
