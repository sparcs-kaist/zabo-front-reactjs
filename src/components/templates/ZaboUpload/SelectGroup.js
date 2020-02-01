import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { setCurrentGroup } from '../../../store/reducers/auth';
import { setGroupSelected } from '../../../store/reducers/upload';

const SelectGroupWrapper = styled.div`
  h1 {
    margin: 20px 0 16px 0;
    font-size: 28px;
    line-height: 32px;
    color: #363636;
  }
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #143441;
  }
  p {
    color: #202020;
    padding-bottom: 18px;
    margin: 0;
  }

  .divider {
    border: 1px solid #E9E9E9;
    width: 582px;
  }

  img {
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
  .subtitle {
    height: 16px;
    font-size: 14px;
    color: #202020;
  }
`;

const useStyles = makeStyles (theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  item: {
    width: '582px',
    height: '106px',
    '&.Mui-selected': {
      backgroundColor: '#F4F4F4',
    },
    '&:hover': {
      backgroundColor: '#F4F4F4',
      cursor: 'pointer',
    },
  },
}));

const InsetDividers = ({ groupsInfo }) => {
  const classes = useStyles ();
  const currentGroup = useSelector (state => state.getIn (['auth', 'info', 'currentGroup']));
  const dispatch = useDispatch ();
  const { profilePhoto, subtitle } = groupsInfo;

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
            <React.Fragment key={_id}>
              <ListItem
                className={classes.item}
                selected={currentGroup && _id === currentGroup.get ('_id')}
                onClick={() => updateGroup (name)}
              >
                {
                  profilePhoto
                    ? <img src={profilePhoto} alt="profile photo" />
                    : <img src={groupDefaultProfile} alt="default profile img" />
                }
                <div>
                  <h3>{name}</h3>
                  <div className="subtitle">{subtitle}</div>
                </div>
                {/* <ListItemText primary={name} secondary={lastUpdated} /> */}
              </ListItem>
              {i !== groupsInfo.length - 1 && <div className="divider"> </div>}
            </React.Fragment>
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
  const groupsInfoImmutable = useSelector (state => state.getIn (['auth', 'info', 'groups']));
  const groupsInfo = useMemo (() => groupsInfoImmutable.toJS (), [groupsInfoImmutable]);

  return (
    <SelectGroupWrapper>
      <h1>그룹 선택하기</h1>
      {groupsInfo.length
        ? (
          <div>
            <p>
              자보를 업로드할 소속 그룹을 선택해주세요.
            </p>
            <InsetDividers
              groupsInfo={groupsInfo}
            />
          </div>
        )
        : <p>현재 속해 있는 그룹이 없습니다.</p>}
    </SelectGroupWrapper>
  );
};

export default SelectGroup;
