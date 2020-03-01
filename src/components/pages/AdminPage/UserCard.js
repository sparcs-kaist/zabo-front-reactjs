import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import StyledQuill from 'organisms/StyledQuill';

import defaultProfile from 'static/images/defaultProfile.png';

import GridItem from './components/Grid/GridItem';

const useStyles = makeStyles (theme => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing (2),
  },
  media: {
    paddingTop: '100%',
    // minHeight: 300,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create ('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  chip: {
    margin: theme.spacing (0.5),
  },
  section1: {
    margin: theme.spacing (3, 2),
  },
  section2: {
    margin: theme.spacing (2),
  },
}));

const STATUS_LIST = ['재학', '졸업예장', '입학전'];
const PERSON_TYPE_LIST = ['Student'];
const FLAG_LIST = ['TEST', 'SPARCS'];
const SSO_LIST = ['KAIST', 'Facebook', 'Tweeter', 'Email'];

const Chips = ({
  classes, label, status, list,
}) => (
  <div className={classes.section2}>
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

const UserCard = ({ user }) => {
  const classes = useStyles ();
  const [expanded, setExpanded] = useState (false);
  const handleExpandClick = () => {
    setExpanded (!expanded);
  };

  const {
    _id, profilePhoto, username, createdAt,
    birthday, email, name, kaistEmail, kaistPersonType, kaistStatus, koreanName,
    flags, description, kaistId, facebookId, tweeterId,
  } = user;

  const ssoList = [];
  if (kaistId) ssoList.push ('KAIST');
  if (facebookId) ssoList.push ('Facebook');
  if (tweeterId) ssoList.push ('Twitter');
  if (email.split ('@')[1] !== 'sso.sparcs.org') ssoList.push ('Email');

  const others = [{
    label: 'ID',
    value: _id,
  }, {
    label: 'Birthday',
    value: birthday,
  }, {
    label: 'createdAt',
    value: createdAt,
  }, {
    label: 'KAIST Email',
    value: kaistEmail,
  }, {
    label: 'Email',
    value: email,
  }];

  return (
    <GridItem xs={12} sm={6} md={4}>
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
              {username} - {koreanName || name || ''}
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
        <CardActions disableSpacing>
          <Button size="small" color="primary">
            {kaistPersonType || 'Not KAIST'}
          </Button>
          <IconButton
            className={clsx (classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Chips classes={classes} label="Person Type" list={PERSON_TYPE_LIST} status={[kaistPersonType]} />
          <Chips classes={classes} label="Status" list={STATUS_LIST} status={[kaistStatus]} />
          <Chips classes={classes} label="Flags" list={FLAG_LIST} status={flags} />
          <Chips classes={classes} label="SSO" list={SSO_LIST} status={ssoList} />
          {
            others.map (({ label, value }) => (
              <CardActions key={label}>
                <Typography gutterBottom variant="body1">
                  {label}
                </Typography>
                <div>
                  <Button size="small" color="primary">
                    {value}
                  </Button>
                </div>
              </CardActions>
            ))
          }
        </Collapse>
      </Card>
    </GridItem>
  );
};

export default UserCard;
