import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ZaboType } from 'lib/propTypes';
import { media } from 'lib/utils/style';

import defaultProfile from 'static/images/defaultProfile.png';

export const OwnerInfoW = styled.div`
  display: flex;
`;

const ProfileW = styled.img`
  width: auto;
`;

const WritingsW = styled.div`
  color: ${props => props.theme.gray100};
`;
WritingsW.Name = styled.div`
  font-size: 14px;
  line-height: 16px;
  ${media.tablet (css`
    font-size: 14px;
    line-height: 16px;
  `)};
`;
WritingsW.Sub = styled.div`
  font-size: 12px;
  line-height: 14px;
`;

const OwnerInfo = ({
  info, showProfile, showSub, styles, style,
}) => {
  const { name, profilePhoto, subtitle } = info;
  const safeUrl = profilePhoto || defaultProfile;
  return (
    <OwnerInfoW style={style}>
      {showProfile && <ProfileW src={safeUrl} />}
      <WritingsW style={styles.writings}>
        <WritingsW.Name style={styles.name}>
          {name || ''}
        </WritingsW.Name>
        {showSub
          && (
            <WritingsW.Sub style={styles.subtitle}>
              {subtitle || ''}
            </WritingsW.Sub>
          )}
      </WritingsW>
    </OwnerInfoW>
  );
};

OwnerInfo.propTypes = {
  info: ZaboType.owner,
  style: PropTypes.shape ({}),
  styles: PropTypes.shape ({
    writings: PropTypes.shape (),
    name: PropTypes.shape (),
    subtitle: PropTypes.shape (),
  }),
  showProfile: PropTypes.bool,
  showSub: PropTypes.bool,
};

OwnerInfo.defaultProps = {
  info: {},
  style: {},
  styles: {
    name: {},
    subtitle: {},
  },
  showProfile: false,
  showSub: false,
};

export default OwnerInfo;
