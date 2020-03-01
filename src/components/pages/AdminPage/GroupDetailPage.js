import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import ProfileStats from 'organisms/ProfileStats';
import StyledQuill from 'organisms/StyledQuill';
import { Page } from 'pages/ProfilePage/Profile.styled';

import { getLabeledTimeDiff } from 'lib/utils';

import defaultProfile from 'static/images/defaultProfile.png';
import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import GridContainer from './components/Grid/GridContainer';
import GridItem from './components/Grid/GridItem';

const MemberW = styled.div`
  border: 1px solid gray;
  border-radius: 6px;
  width: 200px;
  height: 200px;
`;

const useStyles = makeStyles ({
  root: {
    maxWidth: 345,
  },
  media: {
    minHeight: 300,
  },
});

const Member = ({ user }) => {
  const classes = useStyles ();
  const {
    _id, profilePhoto, username, createdAt,
    birthday, email, name, kaistEmail, kaistPersonType, kaistStatus, koreanName,
    flags, description,
  } = user;

  return (
    <GridItem xs={12} sm={6} md={6}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={profilePhoto || defaultProfile}
            title={username}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {username} - {koreanName || name || ''}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            {kaistPersonType}
          </Button>
        </CardActions>
        <CardActions>
          <Button size="small" color="primary">
            {email}
          </Button>
        </CardActions>
        <CardActions>
          <br />
          {flags.map (flag => (
            <Button size="small" color="primary">
              {flag}
            </Button>
          ))}
        </CardActions>
      </Card>
    </GridItem>
  );
};

const GroupDetailPage = ({ match }) => {
  const { name } = match.params;
  const groupIm = useSelector (state => state.getIn (['admin', 'groupsMap', name]));
  const group = useMemo (() => (groupIm ? groupIm.toJS () : null), [groupIm]);
  if (!group) return null;
  const {
    profilePhoto, members, zabosCount, followersCount, recentUpload, description, subtitle,
  } = group;
  const timePast = recentUpload ? getLabeledTimeDiff (recentUpload, true, true, true, true, true, true) : '없음';
  const stats = [{
    name: '자보',
    value: zabosCount,
  }, {
    name: '팔로워',
    value: followersCount,
  }, {
    name: '최근 업로드',
    value: timePast,
  }];

  return (
    <Page>
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={groupDefaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{name}</h1>
            <Tooltip title={subtitle}>
              <p>{subtitle || '아직 소개가 없습니다.'}</p>
            </Tooltip>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Page.Body>
        <Page.Body.Group>
          <StyledQuill
            theme="bubble"
            readOnly
            value={description}
          />
        </Page.Body.Group>
        <GridContainer>
          {members.map (member => (
            <Member user={member.user} />
          ))}
        </GridContainer>
      </Page.Body>
    </Page>
  );
};

export default GroupDetailPage;
