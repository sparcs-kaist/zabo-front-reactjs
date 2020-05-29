import { useEffect } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import queryString from 'query-string';
import { IState } from 'types/store.d';

import ChannelService from 'lib/channel_io';
import { isAuthedSelector } from 'lib/utils';

const ChannelTalk = ({ match } : RouteComponentProps<{top : string}>) => {
  const { search, pathname } = useLocation ();
  const { top } = match.params;
  const isAuthenticated = useSelector (isAuthedSelector);
  const info = useSelector ((state : IState) => get (state, ['auth', 'info']));

  useEffect (() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (top === 'settings') {
      ChannelService.shutdown ();
      return;
    }
    if (pathname === '/zabo/upload') {
      ChannelService.shutdown ();
      return;
    }
    const { code, state } = queryString.parse (search);
    if (code && state) return;
    const settings = {
      pluginKey: '5fe8c634-bcbd-4499-ba99-967191a2ef77',
    };
    if (isAuthenticated) {
      if (!info) return;
      const {
        _id,
        username,
        koreanName,
        groups,
        flags,
        email,
        profilePhoto,
      } = info;
      Object.assign (settings, {
        userId: _id,
        profile: {
          name: username,
          koreanName,
          avatarUrl: profilePhoto,
          groups: groups.map ((group) => group.name).join (', '),
          flags: flags.join (', '),
          email,
        },
      });
    }
    ChannelService.boot (settings);
  }, [search, isAuthenticated, info, top, pathname]);
  return null;
};

export default ChannelTalk;
