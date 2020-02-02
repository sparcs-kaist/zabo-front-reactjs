import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

import { isAuthedSelector } from '../../../lib/utils';
import { toggleZaboLike, toggleZaboPin } from '../../../store/reducers/zabo';

import bookmarkImg from '../../../static/images/bookmark.svg';
import emptyBookmarkImg from '../../../static/images/bookmarkEmpty.svg';
import likeImg from '../../../static/images/like.svg';
import emptyLikeImg from '../../../static/images/likeEmpty.svg';

import whiteBookmarkImg from '../../../static/images/whiteBookmark.svg';
import whiteEmptyBookmarkImg from '../../../static/images/whiteBookmakrEmpty.svg';
import whiteLikeImg from '../../../static/images/whiteLike.svg';
import whiteEmptyLikeImg from '../../../static/images/whiteLikeEmpty.svg';

const icons = {
  colored: {
    pin: {
      filled: bookmarkImg,
      empty: emptyBookmarkImg,
    },
    like: {
      filled: likeImg,
      empty: emptyLikeImg,
    },
  },
  white: {
    pin: {
      filled: whiteBookmarkImg,
      empty: whiteEmptyBookmarkImg,
    },
    like: {
      filled: whiteLikeImg,
      empty: whiteEmptyLikeImg,
    },
  },
};
const toggleActions = {
  pin: toggleZaboPin,
  like: toggleZaboLike,
};

const Icon = styled.img`
  width: 20px;
  height: 18px;
  @media (max-width: 640px) {
    width: 18px;
    height: 16.5px;
  }
`;

const Label = styled.p`
  width: 100%;
  line-height: 18px;
  text-align: center;
  padding-left: 8px;
  margin: 0;
  font-size: 16px;
  @media (max-width: 640px) {
    padding-left: 5.83px;
    line-height: 18px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #143441;
  margin: 28px 8px 72px 0;
  min-width: 86px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #143441;
  padding: 0 16px;
  @media (max-width: 640px) {
    width: 72px;
    height: 38px;
    min-width: 72px;
    padding: 0 11.83px;
    font-size: 14px;
    margin: 24px 8px 64px 0;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 86px;
  height: 40px;
  @media (max-width: 640px) {
    width: 72px;
    height: 38px;
  }
  ${Label} {
    font-weight: 800;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
  }
`;

const StatBox = ({ stat, type, ...props }) => {
  const {
    type: statType, count, zaboId, active,
  } = stat;
  const dispatch = useDispatch ();
  const isAuthed = useSelector (isAuthedSelector);
  const history = useHistory ();
  const colored = (type === 'button');
  const src = icons[colored ? 'colored' : 'white'][statType][active ? 'filled' : 'empty'];
  const throttledAction = useMemo (() => throttle (() => {
    dispatch (toggleActions[statType] (zaboId));
  }, 200), [zaboId]);

  const onClick = e => {
    e.preventDefault ();
    if (isAuthed) throttledAction ();
    else {
      alert ('로그인이 필요합니다.');
      history.push ('/auth/login');
    }
  };

  if (type === 'text') {
    return (
      <Text onClick={onClick} {...props}>
        <Icon src={src} alt="icon image" />
        <Label>{count}</Label>
      </Text>
    );
  }
  return (
    <Button onClick={onClick} {...props}>
      <Icon src={src} alt="icon image" />
      <Label>{count}</Label>
    </Button>
  );
};

StatBox.propTypes = {
  stat: PropTypes.shape ({
    type: PropTypes.oneOf (['pin', 'like']).isRequired,
    count: PropTypes.number,
    zaboId: PropTypes.string.isRequired,
    active: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf (['button', 'text']),
};

StatBox.defaultProps = {
  type: 'button',
};

export default StatBox;
