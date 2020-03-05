import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { UserType } from 'lib/propTypes';

import defaultProfile from '../../../static/images/defaultProfile.png';
import StyledQuill from '../../organisms/StyledQuill';

const useProfileStyles = makeStyles (theme => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing (2),
  },
  media: {
    paddingTop: '100%',
  },
}));

export const UserProfileCard = ({ user }) => {
  const classes = useProfileStyles ();
  const {
    _id, profilePhoto, username, createdAt,
    birthday, email, name, kaistEmail, kaistPersonType, kaistStatus, koreanName,
    flags, description, kaistId, facebookId, tweeterId,
  } = user;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/admin/user/${username}`}>
          <CardMedia
            className={classes.media}
            image={profilePhoto || defaultProfile}
            title={username}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {username} - {name || ''}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <StyledQuill
              theme="bubble"
              readOnly
              value={description || ''}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

UserProfileCard.propTypes = {
  user: UserType.isRequired,
};

const STATUS_LIST = ['재학', '졸업예장', '입학전'];
const PERSON_TYPE_LIST = ['Student'];
const FLAG_LIST = ['TEST', 'SPARCS'];
const SSO_LIST = ['KAIST', 'Facebook', 'Tweeter', 'Email'];

const useChipStyle = makeStyles (theme => ({
  root: {
    margin: theme.spacing (2),
  },
  chip: {
    margin: theme.spacing (0.5),
  },
}));

const Chips = ({ label, status, list }) => {
  const classes = useChipStyle ();
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="body1">
        {label}
      </Typography>
      <div>
        {
          list.map (type => (
            <Chip
              key={type}
              className={classes.chip}
              label={type}
              color={status.some (x => x === type) ? 'primary' : ''}
            />
          ))
        }
        {
          list.some (type => status.some (x => x === type))
          || status.map (stat => <Chip key={stat} className={classes.chip} label={stat} color="primary" />)
        }
      </div>
    </div>
  );
};

Chips.propTypes = {
  label: PropTypes.string,
  /* eslint react/forbid-prop-types:0 */
  status: PropTypes.array,
  list: PropTypes.array,
};

export const UserChips = ({ user }) => {
  const {
    email, kaistPersonType, kaistStatus,
    flags, kaistId, facebookId, tweeterId,
  } = user;

  const ssoList = [];
  if (kaistId) ssoList.push ('KAIST');
  if (facebookId) ssoList.push ('Facebook');
  if (tweeterId) ssoList.push ('Twitter');
  if (email.split ('@')[1] !== 'sso.sparcs.org') ssoList.push ('Email');

  return (
    <>
      <Chips label="Person Type" list={PERSON_TYPE_LIST} status={[kaistPersonType]} />
      <Chips label="Status" list={STATUS_LIST} status={[kaistStatus]} />
      <Chips label="Flags" list={FLAG_LIST} status={flags} />
      <Chips label="SSO" list={SSO_LIST} status={ssoList} />
    </>
  );
};

UserChips.propTypes = {
  user: UserType.isRequired,
};

const UserOtherInfo = ({ user }) => {
  const {
    _id, createdAt, birthday, email, kaistEmail,
    gender, facebookId, firstName, lastName,
    currentGroup, kaistInfoTime, kaistId, groups, followings,
  } = user;
  // TODO: recommends

  const others = [{
    label: 'ID',
    value: _id,
  }, {
    label: 'Facebook ID',
    value: facebookId,
  }, {
    label: 'KAIST ID',
    value: kaistId,
  }, {
    label: 'KAIST Email',
    value: kaistEmail,
  }, {
    label: 'Email',
    value: email,
  }, {
    label: 'Gender',
    value: gender,
  }, {
    label: 'English Name',
    value: `${firstName} ${lastName}`,
  }, {
    label: 'Current Group',
    value: currentGroup ? currentGroup.name : null,
  }, {
    label: 'KAIST Info Time',
    value: kaistInfoTime,
  }, {
    label: 'Groups',
    value: groups.map (group => <Link to={`/admin/group/${group.name}`}>{group.name}</Link>),
  }, {
    label: 'Followings',
    value: followings.map (({ followee, onModel }) => (
      onModel === 'Group'
        ? <Link to={`/admin/group/${followee.name}`}>{followee.name}</Link>
        : <Link to={`/admin/user/${followee.username}`}>{followee.username}</Link>
    )),
  }, {
    label: 'Birthday',
    value: birthday,
  }, {
    label: 'createdAt',
    value: createdAt,
  }];

  return (
    <>
      {
        others.map (({ label, value }) => (
          <CardActions key={label}>
            <Typography gutterBottom variant="body1">
              {label}
            </Typography>
            <div>
              {
                Array.isArray (value)
                  ? value.map (val => (
                    <Button size="small" color="primary" key={val}>
                      {val}
                    </Button>
                  ))
                  : (
                    value ? (
                      <Button size="small" color="primary">
                        {value}
                      </Button>
                    ) : <div>none</div>
                  )
              }
            </div>
          </CardActions>
        ))
      }
    </>
  );
};

UserOtherInfo.propTypes = {
  user: UserType.isRequired,
};

const interestColors = {
  과학생회: '#FF6384',
  자치단체: '#36A2EB',
  총학생회: '#FFCE56',
  생활문화: '#00A5E3',
  예술: '#8DD7BF',
  음악: '#FF96C5',
  종교사회: '#FF5768',
  체육: '#FFBF65',
  학술: '#FC6238',
  창업: '#FFD872',
  관리자: '#E7C582',
};

const UserInterests = ({ user }) => {
  const { interests } = user;
  const cats = Object.keys (interests);
  const data = {
    labels: cats,
    datasets: [{
      data: cats.map (cat => interests[cat]),
      backgroundColor: cats.map (cat => interestColors[cat]),
      hoverBackgroundColor: cats.map (cat => interestColors[cat]),
    }],
  };

  return (
    <Doughnut data={data} width={300} />
  );
};

UserInterests.propTypes = {
  user: UserType.isRequired,
};

const UserInfo = ({ user }) => (
  <>
    <UserProfileCard user={user} />
    <UserChips user={user} />
    <UserOtherInfo user={user} />
    <UserInterests user={user} />
  </>
);

UserInfo.propTypes = {
  user: UserType.isRequired,
};

export default UserInfo;
