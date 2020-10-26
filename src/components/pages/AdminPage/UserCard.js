import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import StyledQuill from 'components/organisms/StyledQuill';

import defaultProfile from 'static/images/defaultProfile.png';

import { UserType } from '../../../lib/propTypes';
import GridItem from './components/Grid/GridItem';
import UserInfo from './UserInfo';

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
}));

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
          <UserInfo user={user} />
        </Collapse>
      </Card>
    </GridItem>
  );
};

UserCard.propTypes = {
  user: UserType.isRequired,
};

export default UserCard;
