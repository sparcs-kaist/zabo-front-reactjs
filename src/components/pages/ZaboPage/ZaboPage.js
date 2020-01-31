import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import throttle from 'lodash.throttle';

import ZaboList from 'templates/ZaboList';
import Header from 'templates/Header';
import Carousel from 'react-airbnb-carousel';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './quill.viewer.scss';

import { ZaboPageWrapper } from './ZaboPage.styled';
import { ZaboType } from '../../../lib/propTypes';
import { getLabeledTimeDiff, to2Digits } from '../../../lib/utils';
import { toggleZaboPin, toggleZaboLike } from '../../../store/reducers/zabo';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import likeImg from '../../../static/images/like.png';
import emptyLikeImg from '../../../static/images/emptyLike.png';
import bookmarkImg from '../../../static/images/bookmark.png';
import emptyBookmarkImg from '../../../static/images/emptyBookmark.png';

const icons = {
  pin: {
    filled: bookmarkImg,
    empty: emptyBookmarkImg,
  },
  like: {
    filled: likeImg,
    empty: emptyLikeImg,
  },
};

const toggleActions = {
  pin: toggleZaboPin,
  like: toggleZaboLike,
};

const StatBox = ({ stat }) => {
  const {
    type, count, zaboId, active,
  } = stat;
  const dispatch = useDispatch ();
  const src = icons[type][active ? 'filled' : 'empty'];
  const throttledAction = useMemo (() => throttle (() => {
    dispatch (toggleActions[type] (zaboId));
  }, 200), []);

  const onClick = e => {
    e.preventDefault ();
    throttledAction ();
  };

  return (
    <ZaboPageWrapper.Info.Box onClick={onClick}>
      <img src={src} alt="icon image" />
      <div>{count}</div>
    </ZaboPageWrapper.Info.Box>
  );
};

StatBox.propTypes = {
  stat: PropTypes.shape ({
    type: PropTypes.oneOf (Object.keys (icons)).isRequired,
    count: PropTypes.number.isRequired,
    zaboId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};

const ZaboPage = (props) => {
  const { zabo, zaboId } = props;
  const {
    title, owner, endAt, createdAt, description, category = [], photos = [{}],
    isLiked, likesCount, isPinned, pinsCount, views = 0,
  } = zabo;
  const timePast = getLabeledTimeDiff (createdAt);
  const due = moment (endAt).diff (moment (), 'days');

  const stats = [{
    type: 'like',
    count: likesCount,
    zaboId,
    active: isLiked,
  }, {
    type: 'pin',
    count: pinsCount,
    zaboId,
    active: isPinned,
  }];

  return (
    <ZaboPageWrapper>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <ZaboPageWrapper.TwoCol>
        <ZaboPageWrapper.TitleImage>
          <Carousel imageUrls={photos.map (({ url }) => url)} ratio={photos[0].width / photos[0].height} />
        </ZaboPageWrapper.TitleImage>
        <ZaboPageWrapper.Info>
          <ZaboPageWrapper.Info.Header>
            <section>
              <ul className="keyword-result">
                {category.map (cat => (
                  <li key={cat}>#{cat}</li>
                ))}
              </ul>
            </section>
            <section>
              <h1>{title}</h1>
              {due > 0 && <div className="due-date">D{to2Digits (-due, true)}</div>}
            </section>
            <section>
              <div className="details">
                {timePast}
              </div>
              <div className="specialChar">&middot;</div>
              <div className="details">조회수 {views}</div>
            </section>
            <section className="statSection">
              {stats.map (stat => <StatBox key={stat.type} stat={stat} />)}
            </section>
          </ZaboPageWrapper.Info.Header>
          <ZaboPageWrapper.Info.Body>
            <section>
              <div className="borderLine"> </div>
              <div className="owner">
                {
                  owner && ('profilePhoto' in owner)
                    ? <img src={owner.profilePhoto} alt="group profile photo" />
                    : <img src={groupDefaultProfile} alt="default profile img" />
                }
                <p>{owner ? owner.name : 'anonymous'}</p>
                <div className="specialChar">&middot;</div>
                <p className="follow">팔로잉</p>
              </div>
              <div className="borderLine"> </div>
            </section>
            <section className="contents">
              {/* description */}
              <ReactQuill
                className="quill-zabo-viewer"
                theme="bubble"
                readOnly
                value={description}
              />
            </section>
          </ZaboPageWrapper.Info.Body>
        </ZaboPageWrapper.Info>
      </ZaboPageWrapper.TwoCol>
      <ZaboPageWrapper.Recommend>
        <h1>연관 있는 자보</h1>
        <ZaboList type="related" relatedTo={zaboId} key={zaboId} />
      </ZaboPageWrapper.Recommend>
    </ZaboPageWrapper>
  );
};

ZaboPage.propTypes = {
  zabo: PropTypes.shape (ZaboType).isRequired,
  zaboId: PropTypes.string.isRequired,
};

export default ZaboPage;
