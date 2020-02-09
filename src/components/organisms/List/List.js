import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import MaterialList from '@material-ui/core/List';
import MaterialListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles (theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  item: {
    width: '582px',
    height: '106px',
    '@media (max-width: 640px)': {
      width: '100%',
      height: '84px',
    },
    '&.Mui-selected': {
      backgroundColor: '#143441',
    },
    '&:hover': {
      backgroundColor: '#F4F4F4',
      cursor: 'pointer',
    },
  },
}));

const StyledList = styled (MaterialList)`
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #143441;
    font-weight: 800;
  }
  .divider {
    border: 1px solid #E9E9E9;
    width: 582px;
  }
  img {
    width: 70px;
    height: 70px;
    margin-right: 16px;
    border-radius: 50%;
  }
  .role {
    height: 16px;
    font-size: 14px;
    color: #202020;
  }
  li { padding: 0 }
  li:hover {
    h3 { color: #143441 }
    .role { color: #202020 }
  }
  li.Mui-selected, li.Mui-selected:hover {
    background-color: #143441;
    h3, .role {
      color: white;
    }
  }
  @media (max-width: 640px) {
    img {
      width: 60px;
      height: 60px;
      margin-right: 12px;
    }
    h3 { font-size: 16px }
    .role { font-size: 14px }
  }
`;

const List = ({ dataSource, renderItem }) => {
  const classes = useStyles ();
  return (
    <StyledList className={classes.root}>
      {dataSource.map (renderItem)}
    </StyledList>
  );
};

List.GroupMemberItem = (props) => {
  const classes = useStyles ();
  return (
    <MaterialListItem className={classes.item} {...props} />
  );
};

List.propTypes = {
  dataSource: PropTypes.arrayOf (PropTypes.shape ({

  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => <div key={item}>{item}</div>,
};

export default List;
