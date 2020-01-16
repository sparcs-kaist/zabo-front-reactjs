import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';

import { setCurrentGroup } from '../../../store/reducers/auth';
import { setGroupSelected } from '../../../store/reducers/upload';

const useStyles = makeStyles (theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
}));

const InsetDividers = ({ groupsInfo }) => {
  const classes = useStyles ();
  const currentGroup = useSelector (state => state.getIn (['auth', 'info', 'currentGroup']));
  const dispatch = useDispatch ();

  const updateGroup = useCallback ((groupName) => {
    dispatch (setCurrentGroup (groupName))
      .then (() => dispatch (setGroupSelected (true)))
      .catch (error => console.error (error));
  }, []);

  return (
    <List className={classes.root}>
      {
        groupsInfo.map ((info, i) => {
          const {
            _id, name, lastUpdated,
          } = info;
          return (
            <>
              <ListItem
                key={_id}
                className={classes.item}
                selected={currentGroup && _id === currentGroup.get ('_id')}
                onClick={() => updateGroup (name)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={lastUpdated} />
              </ListItem>
              {i !== groupsInfo.length - 1 && <Divider variant="inset" component="li" />}
            </>
          );
        })
      }
    </List>
  );
};

InsetDividers.propTypes = {
  groupsInfo: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    members: PropTypes.array,
    lastUpdated: PropTypes.string,
  })),
};

InsetDividers.defaultProps = {
  groupsInfo: [],
};


const SelectGroup = () => {
  const groupsInfo = useSelector (state => state.getIn (['auth', 'info', 'groups']));

  return (
    <div>
      {groupsInfo.size
        ? (
          <InsetDividers
            groupsInfo={groupsInfo.toJS ()}
          />
        )
        : <div>현재 속해 있는 그룹이 없습니다.</div>}
    </div>
  );
};

export default SelectGroup;
