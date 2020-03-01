import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import moment from 'moment';

import StyledQuill from 'organisms/StyledQuill';

import { acceptApplyGroup, getGroupApplyList, getGroupList } from 'store/reducers/admin';

import GridContainer from './components/Grid/GridContainer';
import GridItem from './components/Grid/GridItem';

const useStyles = makeStyles (theme => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const GroupItem = ({ group, isPending }) => {
  const classes = useStyles ();
  const [expanded, setExpanded] = useState (false);
  const handleExpandClick = () => {
    setExpanded (!expanded);
  };

  const dispatch = useDispatch ();
  const accept = useCallback (() => {
    dispatch (acceptApplyGroup ({ name: group.name }));
  }, [group.name]);

  return (
    <GridItem xs={12} sm={6} md={6}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={group.profilePhoto} />
          }
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={group.name}
          subheader={moment (group.createdAt).format ('YYYY-MM-DD HH:mm:ss')}
        />
        <CardMedia
          className={classes.media}
          image={group.profilePhoto}
          title={group.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {group.subtitle}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {isPending && (
            <div onClick={accept} style={{ cursor: 'pointer' }}>
            승인하기
            </div>
          )}
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
          <CardContent>
            <Typography paragraph>
              <StyledQuill
                theme="bubble"
                readOnly
                value={group.description}
              />
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </GridItem>
  );
};

const GroupAdminPage = () => {
  const dispatch = useDispatch ();
  useEffect (() => {
    dispatch (getGroupApplyList ());
    dispatch (getGroupList ());
  }, []);
  const pendingGroupsImmutable = useSelector (state => state.getIn (['admin', 'pendingGroups']));
  const pendingGroups = useMemo (() => pendingGroupsImmutable.toJS (), [pendingGroupsImmutable]);
  const groupsImmutable = useSelector (state => state.getIn (['admin', 'groups']));
  const groups = useMemo (() => groupsImmutable.toJS (), [groupsImmutable]);

  return (
    <div>
      <h2>Pending Groups</h2>
      <GridContainer>
        {pendingGroups.map (group => (
          <GroupItem group={group} isPending />
        ))}
      </GridContainer>
      <h2>Groups</h2>
      <GridContainer>
        {groups.map (group => (
          <GroupItem group={group} />
        ))}
      </GridContainer>
    </div>
  );
};

export default GroupAdminPage;
